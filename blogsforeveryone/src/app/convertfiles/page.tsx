
import DocxToPdf from "@/components/fileconverters/DocsxToPdf";

export default function ConvertFiles() {
    return (
        <>
            <div className="flex p-10 gap-10">
                <DocxToPdf />
            </div>
        </>);
}