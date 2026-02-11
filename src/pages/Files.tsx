import PageTitle from "@/components/ui/page-title";
import aiFile from "/ai.svg";
import docxFile from "/docx.svg";
import figFile from "/fig.svg";
import jpgFile from "/jpg.svg";
import mp4File from "/mp4.svg";
import pdfFile from "/pdf.svg";
import pngFile from "/png.svg";
import psdFile from "/psd.svg";
import webmFile from "/webm.svg";
import webpFile from "/webp.svg";
import file from "/file.svg";
import useStore from "@/store/useStore";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download } from "lucide-react";

const fileIcons: Record<string, string> = {
  ai: aiFile,
  docx: docxFile,
  fig: figFile,
  jpg: jpgFile,
  mp4: mp4File,
  pdf: pdfFile,
  png: pngFile,
  psd: psdFile,
  webm: webmFile,
  webp: webpFile,
  file: file,
};

function Files() {
  const files = useStore((state) => state.files);
  return (
    <>
      <PageTitle>Files</PageTitle>
      <div className="grid grid-cols-1 xs:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {files.map((file) => {
          return (
            <Card key={file.id} className="p-3 gap-4 relative">
              <Download className="absolute top-3 left-3 size-5 cursor-pointer text-gray-500" />
              <CardHeader className="p-0 pt-3 w-full justify-items-center gap-4">
                <img
                  src={fileIcons[file.type] || fileIcons["file"]}
                  alt={file.name}
                  className="size-16"
                />
                <CardTitle className="truncate text-sm">{file.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-xs text-muted-foreground">
                Uploader: {file.uploader}
              </CardContent>
              <CardFooter className="p-0 pt-3! text-xs text-muted-foreground flex items-center justify-between w-full border-t">
                <span>{file.dateUploaded}</span>
                <span>
                  {file.size} {file.unit}
                </span>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default Files;
