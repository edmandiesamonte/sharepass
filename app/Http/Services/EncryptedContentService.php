<?php

namespace App\Http\Services;

use Carbon\Carbon;
use Illuminate\Encryption\Encrypter;
use Illuminate\Support\Facades\Storage;

class EncryptedContentService
{
    private const TOKEN_SEPARATOR = '.';

    private const TIMESTAMP_CONVERT_BASE = 31;

    private function getCipher()
    {
        return config('app.cipher');
    }

    public function encryptAndSave(string $expiryType, string $content): string
    {
        $cipher = $this->getCipher();

        $cipherKey = Encrypter::generateKey($cipher);

        $encrypter = new Encrypter($cipherKey, $cipher);

        $expiry = match ($expiryType) {
            'day' => now()->addDay(),
            'week' => now()->addWeek(),
            default => now()->addHour(),
        };

        $encodedExpiry = base_convert($expiry->timestamp, 10, self::TIMESTAMP_CONVERT_BASE);
        $encodedCipherKey = $this->base64UrlEncode($cipherKey);
        $shortHash = $this->shortHash($encodedExpiry, $encodedCipherKey);

        $urlKey = implode(self::TOKEN_SEPARATOR, [
            $encodedExpiry,
            $encodedCipherKey,
            $shortHash,
        ]);

        Storage::put(
            $this->getStorageKey($encodedExpiry, $shortHash),
            $encrypter->encryptString($content),
            [
                'Tagging' => "auto-delete={$expiryType}",
            ]
        );

        return $urlKey;
    }

    public function isValidKey(string $key): bool
    {
        $tokens = explode(self::TOKEN_SEPARATOR, $key);

        if (count($tokens) !== 3) {
            return false;
        }

        [$encodedExpiry, $encodedCipherKey, $shortHash] = $tokens;

        if (
            ! $this->isShortHashMatching($encodedExpiry, $encodedCipherKey, $shortHash) ||
            ! Storage::exists($this->getStorageKey($encodedExpiry, $shortHash))
        ) {
            return false;
        }

        try {
            // Validate expiration
            $expiryTimestamp = intval($encodedExpiry, self::TIMESTAMP_CONVERT_BASE);
            if (Carbon::createFromTimestamp($expiryTimestamp)->isPast()) {
                return false;
            }

            // Validate cipher key
            $cipherKey = $this->base64UrlDecode($encodedCipherKey);
            if (! Encrypter::supported($cipherKey, $this->getCipher())) {
                return false;
            }
        } catch (\Throwable $e) {
            return false;
        }

        return true;
    }

    public function getAndForgetContent(string $key): false|string
    {
        [$encodedExpiry, $encodedCipherKey, $shortHash] = explode(self::TOKEN_SEPARATOR, $key);
        $storageKey = $this->getStorageKey($encodedExpiry, $shortHash);

        $encryptedContent = Storage::get($storageKey);
        Storage::delete($storageKey);

        $cipherKey = $this->base64UrlDecode($encodedCipherKey);
        $encrypter = new Encrypter($cipherKey, $this->getCipher());

        return $encrypter->decryptString($encryptedContent);
    }

    private function base64UrlEncode(string $data): string
    {
        return strtr(base64_encode($data), '+/=', '-_~');
    }

    private function base64UrlDecode(string $data): string
    {
        return base64_decode(strtr($data, '-_~', '+/='));
    }

    private function shortHash(string $encodedExpiryKey, string $encodedCipherKey): string
    {
        return mb_substr(hash('sha256', implode(self::TOKEN_SEPARATOR, [$encodedExpiryKey, $encodedCipherKey])), -10);
    }

    private function isShortHashMatching(string $encodedExpiryKey, string $encodedCipherKey, string $shortHash): bool
    {
        return $shortHash === $this->shortHash($encodedExpiryKey, $encodedCipherKey);
    }

    private function getStorageKey(string $encodedExpiry, string $shortHash): string
    {
        return implode(self::TOKEN_SEPARATOR, [
            $encodedExpiry,
            $shortHash,
        ]);
    }
}
