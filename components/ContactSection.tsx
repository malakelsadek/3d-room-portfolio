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
            I'm always happy to connect, whether that's an internship, a freelance
            project, or just a conversation about data, code, or your latest build.
            Send me a message and let's talk.
        </p>

        <div className="flex flex-col gap-3">
            <a href="mailto:elsadek.malak@gmail.com" className="text-purple-200 hover:text-white transition-colors">
            ✉ elsadek.malak@gmail.com
            </a>
            <a href="https://github.com/malakelsadek" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white transition-colors">
            → GitHub
            </a>
            <a href="https://www.linkedin.com/in/malakelsadek/" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white transition-colors">
            → LinkedIn
            </a>
        </div>
        </div>
    </section>
    );
}