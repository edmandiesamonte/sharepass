<?php

namespace App\Http\Controllers;

use App\Http\Services\EncryptedContentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class MainController extends Controller
{
    public function index()
    {
        return Inertia::render('Index');
    }

    public function create(Request $request, EncryptedContentService $service)
    {
        $data = $request->validate([
            'content' => ['required', 'string'],
            'expiry' => ['nullable', Rule::in(['hour', 'day', 'week'])],
            'copies' => ['nullable', 'integer', 'min:1', 'max:5'],
        ]);

        $copies = $data['copies'] ?? 1;

        $urls = [];
        for ($i = 0; $i < $copies; $i++) {
            $urls[] = route('askToConfirm', [
                'key' => $service->encryptAndSave($data['expiry'], $data['content']),
            ]);
        }

        return Inertia::render('ShareLinks', [
            'urls' => $urls,
        ]);
    }

    public function askToConfirm(string $key, EncryptedContentService $service)
    {
        if (! $service->isValidKey($key)) {
            Storage::delete($key);
            abort(404);
        }

        return Inertia::render('Confirm', [
            'revealUrl' => route('reveal', ['key' => $key]),
        ]);
    }

    public function reveal(string $key, EncryptedContentService $service)
    {
        if (! $service->isValidKey($key)) {
            Storage::delete($key);
            abort(404);
        }

        $content = $service->getAndForgetContent($key);

        Storage::delete($key);

        return Inertia::render('Reveal', [
            'content' => $content,
        ]);
    }
}
