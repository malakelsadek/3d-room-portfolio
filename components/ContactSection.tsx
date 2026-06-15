export default function ContactSection() {
    return (
    <section className="h-screen flex items-center px-6 md:px-20">
        <div className="max-w-md">
        <h2 className="text-sm uppercase tracking-[0.3em] text-purple-300 mb-4">
            03 — Contact
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Talk
        </h3>
        <p className="text-purple-100 leading-relaxed mb-8">
            [Placeholder — short message inviting people to reach out]
        </p>

        <div className="flex flex-col gap-3">
            <a href="mailto:your@email.com" className="text-purple-200 hover:text-white transition-colors">
            ✉ your@email.com
            </a>
            <a href="#" className="text-purple-200 hover:text-white transition-colors">
            → GitHub
            </a>
            <a href="#" className="text-purple-200 hover:text-white transition-colors">
            → LinkedIn
            </a>
        </div>
        </div>
    </section>
    );
}