"use client"

import { useEffect, useRef, useState } from "react"
import { Spinner } from "@/components/ui/spinner"

interface PDFPreviewProps {
  src: string
  className?: string
}

export function PDFPreview({ src, className }: PDFPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadPdf = async () => {
      if (!canvasRef.current) return
      setLoading(true)
      setError(null)

      try {
        const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf")
        const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry")
        pdfjsLib.GlobalWorkerOptions.workerSrc = (pdfjsWorker as any)?.default || pdfjsWorker

        const loadingTask = pdfjsLib.getDocument(src)
        const pdf = await loadingTask.promise
        const page = await pdf.getPage(1)
        const viewport = page.getViewport({ scale: 1.5 })

        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        if (!context) throw new Error("Impossible de récupérer le contexte du canvas")

        canvas.width = viewport.width
        canvas.height = viewport.height

        await page.render({ canvasContext: context, viewport }).promise
      } catch (err) {
        if (!cancelled) {
          console.error("PDF preview error:", err)
          setError("Aperçu PDF indisponible")
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadPdf()

    return () => {
      cancelled = true
    }
  }, [src])

  return (
    <div className={className}>
      {loading && (
        <div className="flex min-h-[220px] items-center justify-center bg-muted">
          <Spinner className="w-8 h-8 text-muted-foreground" />
        </div>
      )}
      {error && (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-3xl bg-muted p-6 text-center text-sm text-muted-foreground">
          {error}
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`w-full ${loading || error ? "hidden" : "block"}`}
      />
    </div>
  )
}
