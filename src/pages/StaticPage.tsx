import Layout from "@/components/Layout";

type Props = {
  title: string;
  lead?: string;
  sections?: Array<{ title: string; body: string }>;
};

const StaticPage = ({ title, lead, sections = [] }: Props) => {
  return (
    <Layout>
      <div className="container py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          {lead && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lead}</p>}

          {sections.length > 0 && (
            <div className="mt-8 space-y-6">
              {sections.map((s) => (
                <section key={s.title} className="rounded-xl border border-border bg-card p-6">
                  <h2 className="font-display text-lg font-semibold">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StaticPage;

