"use client";

type Props = {
  targetId: string;
  title: string;
};

export function PdfExportButton({ targetId, title }: Props) {
  const exportPdf = async () => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const check = await fetch("/api/export", { method: "POST" });
    if (!check.ok) {
      const data = await check.json();
      alert(data.error ?? "Export blocked");
      return;
    }

    const policy = await check.json() as { watermark: boolean };

    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.background = "white";
    clone.style.padding = "0";

    if (policy.watermark) {
      const wm = document.createElement("div");
      wm.textContent = "Generated with LetterForge Free Plan";
      wm.style.position = "fixed";
      wm.style.top = "50%";
      wm.style.left = "50%";
      wm.style.transform = "translate(-50%, -50%) rotate(-30deg)";
      wm.style.fontSize = "28px";
      wm.style.opacity = "0.15";
      wm.style.zIndex = "9999";
      clone.appendChild(wm);
    }

    const { default: html2pdf } = await import("html2pdf.js");
    await html2pdf()
      .set({
        filename: `${title || "letterforge-document"}.pdf`,
        margin: [0, 0, 0, 0],
        pagebreak: { mode: ["css", "legacy"] },
        jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait" }
      })
      .from(clone)
      .save();
  };

  return (
    <button onClick={exportPdf} className="rounded bg-slate-900 px-3 py-2 text-sm font-medium text-white">
      Export PDF
    </button>
  );
}
