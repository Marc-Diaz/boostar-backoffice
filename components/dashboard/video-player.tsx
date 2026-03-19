import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VideoPlayerProps {
  src: string
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent>
        <video
          src={src}
          controls
          className="w-full rounded-md shadow-md"
        >
          Tu navegador no soporta este video.
        </video>
      </CardContent>
    </Card>
  );
}