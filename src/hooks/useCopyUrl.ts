import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function useCopyUrl() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const copyUrl = async () => {
        const url = `${window.location.origin}${pathname}${searchParams.toString() ? "?" + searchParams.toString() : ""
            }`;

        try {
            await navigator.clipboard.writeText(url);
            toast.success("Copied")
            // alert("URL copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy URL", err);
        }
    };

    return copyUrl;
}
