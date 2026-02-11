"use client";

import { useMemo, useState } from "react";
import { TiptapEditor } from "@/components/editor/TiptapEditor";
import { PdfExportButton } from "@/components/editor/PdfExportButton";
import { TemplateMinimal, TemplateCenteredLogo, TemplateTopColorBar, TemplateLeftStripe, TemplateModernClean, TemplateLegalFooter } from "@/components/templates/LetterheadTemplates";

const variables = ["{{recipient_name}}", "{{date}}", "{{reference_no}}"];

export function EditorWorkspace() {
  const [content, setContent] = useState<object>({});
  const [template, setTemplate] = useState("minimal");
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const selectedTemplate = useMemo(() => {
    const company = {
      name: "Acme Exports Pvt Ltd",
      logoUrl: "",
      address: "Industrial Area, Mumbai",
      phone: "+91 99999 99999",
      email: "info@acme.com",
      website: "acme.com",
      gst: "27AAAAA0000A1Z5",
      signatory: "John Doe",
      primaryColor: "#0f172a",
      secondaryColor: "#334155"
    };

    const templates = {
      minimal: <TemplateMinimal company={company} showHeader={showHeader} showFooter={showFooter} />,
      centered: <TemplateCenteredLogo company={company} showHeader={showHeader} showFooter={showFooter} />,
      topbar: <TemplateTopColorBar company={company} showHeader={showHeader} showFooter={showFooter} />,
      stripe: <TemplateLeftStripe company={company} showHeader={showHeader} showFooter={showFooter} />,
      modern: <TemplateModernClean company={company} showHeader={showHeader} showFooter={showFooter} />,
      legal: <TemplateLegalFooter company={company} showHeader={showHeader} showFooter={showFooter} />
    };

    return templates[template as keyof typeof templates];
  }, [template, showHeader, showFooter]);

  return (
    <main className="grid min-h-screen grid-cols-[260px_1fr_280px] gap-4 p-4">
      <aside className="space-y-4 rounded bg-white p-4 shadow">
        <h2 className="text-lg font-semibold">Templates</h2>
        <select className="w-full rounded border p-2" onChange={(e) => setTemplate(e.target.value)} value={template}>
          <option value="minimal">Minimal</option><option value="centered">Centered logo</option>
          <option value="topbar">Top color bar</option><option value="stripe">Left vertical stripe</option>
          <option value="modern">Modern clean</option><option value="legal">Legal heavy footer</option>
        </select>
        <label className="flex items-center gap-2"><input type="checkbox" checked={showHeader} onChange={(e) => setShowHeader(e.target.checked)} /> Header</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={showFooter} onChange={(e) => setShowFooter(e.target.checked)} /> Footer</label>
        <div>
          <h3 className="mb-2 font-medium">Variables</h3>
          {variables.map((variable) => <p key={variable} className="rounded bg-slate-100 px-2 py-1 text-sm">{variable}</p>)}
        </div>
      </aside>

      <section className="overflow-auto rounded bg-slate-200 p-6" id="pdf-root">
        <div className="mx-auto w-[794px] bg-white">
          {selectedTemplate}
          <TiptapEditor initialContent={content} onChange={setContent} />
        </div>
      </section>

      <aside className="space-y-3 rounded bg-white p-4 shadow">
        <h2 className="text-lg font-semibold">Actions</h2>
        <PdfExportButton targetId="pdf-root" />
        <p className="text-sm text-slate-500">A4 width fixed at 794px with simulated pages and page-break support via CSS/html2pdf.</p>
      </aside>
    </main>
  );
}
