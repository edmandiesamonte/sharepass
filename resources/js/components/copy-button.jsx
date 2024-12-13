import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { FormattedMessage } from "react-intl";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function CopyButton({ content, className, ...props }) {
    const buttonRef = useRef();
    const [copied, setCopied] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(
        () => () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        },
        [],
    );
    const handleCopy = async (e) => {
        e.preventDefault();

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeoutId(setTimeout(() => setCopied(false), 2000));
        } catch (err) {
            setCopied(false);
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Button
                    className={cn(
                        copied && "bg-green-500 hover:bg-green-500",
                        className,
                    )}
                    {...props}
                    ref={buttonRef}
                    onClick={handleCopy}
                >
                    {copied ? <Check /> : <Copy />}
                    <span className="sr-only">
                        <FormattedMessage defaultMessage="Copy to Clipboard" />
                    </span>
                </Button>
            </TooltipTrigger>
            <TooltipContent
                onPointerDownOutside={(e) => {
                    if (e.target === buttonRef.current) {
                        e.preventDefault();
                    }
                }}
            >
                {copied ? (
                    <FormattedMessage defaultMessage="Copied!" />
                ) : (
                    <FormattedMessage defaultMessage="Copy to Clipboard" />
                )}
            </TooltipContent>
        </Tooltip>
    );
}
