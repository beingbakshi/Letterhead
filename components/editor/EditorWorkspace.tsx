"use client";

import { useMemo, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextAlign from "@tiptap/extension-text-align";
import { TiptapEditor } from "@/components/editor/TiptapEditor";
import { PdfExportButton } from "@/components/editor/PdfExportButton";
import {
  TemplateCenteredLogo,
  TemplateLeftStripe,
  TemplateLegalFooter,
  TemplateMinimal,
  TemplateModernClean,
  TemplateTopColorBar
} from "@/components/templates/LetterheadTemplates";

const variables = ["{{recipient_name}}", "{{date}}", "{{reference_no}}"];

const company = {
  name: "Acme Exports Pvt Ltd",
  logoUrl: "",
  address: "Industrial Area, Mumbai",
  phone: "+91 99999 99999",
  email: "info@acme.com",
  website: "acme.com",
  gst: "27AAAAA0000A1Z5",
  signatory: "John Doe",
  signatureUrl: "",
  primaryColor: "#0f172a",
  secondaryColor: "#334155"
};

export function EditorWorkspace() {
  const [docTitle, setDocTitle] = useState("Untitled Letter");
  const [template, setTemplate] = useState("minimal");
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [logoSize, setLogoSize] = useState(54);
  const [marginX, setMarginX] = useState(32);
  const [isGenerating, setIsGenerating] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Write your letter, insert variables, table, signature or page breaks..." })
    ],
    content: {
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: "Subject: Formal Business Letter" }] }]
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[860px] px-8 py-8 focus:outline-none"
      }
    }
  });

  const selectedTemplate = useMemo(() => {
    const props = { company, showHeader, showFooter, logoSize, marginX };
    const templates = {
      minimal: <TemplateMinimal {...props} />,
      centered: <TemplateCenteredLogo {...props} />,
      topbar: <TemplateTopColorBar {...props} />,
      stripe: <TemplateLeftStripe {...props} />,
      modern: <TemplateModernClean {...props} />,
      legal: <TemplateLegalFooter {...props} />
    };
    return templates[template as keyof typeof templates];
  }, [template, showHeader, showFooter, logoSize, marginX]);

  const insertVariable = (token: string) => editor?.chain().focus().insertContent(`${token} `).run();
  const insertSignature = () => {
    if (company.signatureUrl) editor?.chain().focus().setImage({ src: company.signatureUrl }).run();
    else editor?.chain().focus().insertContent(`\n${company.signatory}\nAuthorized Signatory`).run();
  };
  const insertPageBreak = () => editor?.chain().focus().insertContent('<div class="page-break"></div><p></p>').run();

  const generateWithAi = async () => {
    const prompt = window.prompt("What should AI write?");
    if (!prompt) return;
    setIsGenerating(true);
    const response = await fetch("/api/ai", { method: "POST", body: JSON.stringify({ prompt }) });
    const data = await response.json();
    if (data.text) editor?.chain().focus().insertContent(`<p>${data.text}</p>`).run();
    setIsGenerating(false);
  };

  return (
    <main className="space-y-4 p-4">
      <header className="flex items-center justify-between rounded bg-white p-3 shadow">
        <div className="flex items-center gap-3">
          <input value={docTitle} onChange={(e) => setDocTitle(e.target.value)} className="rounded border px-3 py-2" />
          <button className="rounded border px-3 py-2 text-sm" onClick={() => alert("Save action can be connected to server action.")}>Save</button>
          <button className="rounded border px-3 py-2 text-sm" onClick={() => window.print()}>Preview</button>
          <PdfExportButton targetId="pdf-root" title={docTitle} />
        </div>
        <button className="rounded border px-3 py-2 text-sm" onClick={generateWithAi} disabled={isGenerating}>{isGenerating ? "Generating..." : "Generate with AI"}</button>
      </header>

      <div className="grid min-h-[calc(100vh-120px)] grid-cols-[280px_1fr_300px] gap-4">
        <aside className="space-y-4 rounded bg-white p-4 shadow">
          <section>
            <h2 className="mb-2 text-sm font-semibold uppercase text-slate-500">Templates</h2>
            <select className="w-full rounded border p-2" value={template} onChange={(e) => setTemplate(e.target.value)}>
              <option value="minimal">Minimal</option>
              <option value="centered">Centered logo</option>
              <option value="topbar">Top color bar</option>
              <option value="stripe">Left vertical stripe</option>
              <option value="modern">Modern clean</option>
              <option value="legal">Legal heavy footer</option>
            </select>
          </section>
          <section>
            <h2 className="mb-2 text-sm font-semibold uppercase text-slate-500">Page Setup</h2>
            <label className="mb-1 block text-sm">Horizontal margins ({marginX}px)</label>
            <input type="range" min={16} max={72} value={marginX} onChange={(e) => setMarginX(Number(e.target.value))} className="w-full" />
            <label className="mt-3 block text-sm">Logo size ({logoSize}px)</label>
            <input type="range" min={24} max={96} value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} className="w-full" />
            <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={showHeader} onChange={(e) => setShowHeader(e.target.checked)} />Header</label>
            <label className="mt-1 flex items-center gap-2 text-sm"><input type="checkbox" checked={showFooter} onChange={(e) => setShowFooter(e.target.checked)} />Footer</label>
          </section>
          <section>
            <h2 className="mb-2 text-sm font-semibold uppercase text-slate-500">Variables</h2>
            <div className="space-y-2">
              {variables.map((variable) => (
                <button key={variable} className="w-full rounded bg-slate-100 px-2 py-1 text-left text-sm" onClick={() => insertVariable(variable)}>
                  {variable}
                </button>
              ))}
            </div>
          </section>
        </aside>

        <section className="overflow-auto rounded bg-slate-200 p-4">
          <div id="pdf-root" className="mx-auto w-[794px] bg-white shadow-xl">
            {selectedTemplate}
            <TiptapEditor editor={editor} />
          </div>
        </section>

        <aside className="space-y-3 rounded bg-white p-4 shadow">
          <h2 className="text-sm font-semibold uppercase text-slate-500">Text styling controls</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button className="rounded border px-2 py-1" onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</button>
            <button className="rounded border px-2 py-1" onClick={() => editor?.chain().focus().toggleItalic().run()}>Italic</button>
            <button className="rounded border px-2 py-1" onClick={() => editor?.chain().focus().setTextAlign("left").run()}>Left</button>
            <button className="rounded border px-2 py-1" onClick={() => editor?.chain().focus().setTextAlign("right").run()}>Right</button>
            <button className="rounded border px-2 py-1" onClick={() => editor?.chain().focus().setTextAlign("center").run()}>Center</button>
            <button className="rounded border px-2 py-1" onClick={() => editor?.chain().focus().toggleBulletList().run()}>Bullets</button>
          </div>
          <button className="w-full rounded border px-3 py-2 text-sm" onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>Insert table</button>
          <button className="w-full rounded border px-3 py-2 text-sm" onClick={insertSignature}>Insert signature</button>
          <button className="w-full rounded border px-3 py-2 text-sm" onClick={insertPageBreak}>Insert page break</button>
        </aside>
      </div>
    </main>
  );
}
