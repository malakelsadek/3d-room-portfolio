const placeholderProjects = [
    {
        title: 'Project One',
        description: 'A short description of what this project does and the tech used.',
        tags: ['Python', 'ML'],
    },
    {
        title: 'Project Two',
        description: 'A short description of what this project does and the tech used.',
        tags: ['React', 'Next.js'],
    },
    {
        title: 'Project Three',
        description: 'A short description of what this project does and the tech used.',
        tags: ['Data Viz', 'SQL'],
    },
];

export default function WorksSection() {
    return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-20">
        <h2 className="text-sm uppercase tracking-[0.3em] text-purple-300 mb-4 self-start md:self-center">
        02 — My Works
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-12 self-start md:self-center">
        Things I've Built
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {placeholderProjects.map((project) => (
            <div
            key={project.title}
            className="bg-purple-950/40 border border-purple-400/20 rounded-2xl p-6 backdrop-blur-sm hover:border-purple-300/50 transition-all hover:-translate-y-1"
            >
            <h4 className="text-xl font-semibold text-white mb-2">
                {project.title}
            </h4>
            <p className="text-purple-200 text-sm mb-4">
                {project.description}
            </p>
            <div className="flex gap-2">
                {project.tags.map((tag) => (
                <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-purple-400/10 text-purple-300"
                >
                    {tag}
                </span>
                ))}
            </div>
            </div>
        ))}
        </div>
    </section>
    );
}