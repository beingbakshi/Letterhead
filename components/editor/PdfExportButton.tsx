"use client";

export function PdfExportButton({ targetId }: { targetId: string }) {
  const exportPdf = async () => {
    const element = document.getElementById(targetId);
    if (!element) return;
    const { default: html2pdf } = await import("html2pdf.js");
    await html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: "letterforge-document.pdf",
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] }
      })
      .from(element)
      .save();
  };

  return <button onClick={exportPdf} className="rounded bg-slate-900 px-3 py-2 text-white">Export PDF</button>;
}
