import { FormattedMessage } from "react-intl";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import CopyButton from "@/components/copy-button";
import { PageTitle } from "@/components/texts";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { ArrowLeft, Info } from "lucide-react";

export default function Reveal({ content }) {
    return (
        <div className="space-y-4">
            <PageTitle>
                <FormattedMessage defaultMessage="Content" />
            </PageTitle>
            <Separator />
            <div className="space-y-4">
                <div className="flex gap-2 max-w-screen-lg">
                    <Textarea
                        value={content}
                        readOnly
                        className="resize-y min-h-40"
                    />
                    <CopyButton content={content} />
                </div>
                <div className="flex items-center border p-3 text-muted-foreground gap-2 text-sm rounded-md max-w-screen-lg bg-orange-50 border-orange-200">
                    <Info className="size-4 shrink-0" />
                    <FormattedMessage defaultMessage="This content has now been permanently deleted, and the secure link will no longer work. Save your content now to a new secure location." />
                </div>
            </div>
            <Button asChild variant="ghost">
                <Link href="/">
                    <ArrowLeft />
                    <FormattedMessage defaultMessage="Back to Home" />
                </Link>
            </Button>
        </div>
    );
}
