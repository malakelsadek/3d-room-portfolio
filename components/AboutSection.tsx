'use client';

import { motion } from 'framer-motion';
import SplineScene from './SplineScene'; // Imports your room scene component


export default function AboutSection() {
    return (
    <section className="h-screen flex items-center px-6 md:px-20">
        <div className="max-w-md">
        <h2 className="text-sm uppercase tracking-[0.3em] text-purple-300 mb-4">
            About Me
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hi, I'm Malak
        </h3>
        <p className="text-purple-100 leading-relaxed">
            [Placeholder — your bio goes here. Talk about your background,
            what drives you, and what you're currently focused on in data
            science and software development.]
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
            {['Python', 'Machine Learning', 'JavaScript', 'React', 'SQL', 'C++'].map((skill) => (
            <span
                key={skill}
                className="px-4 py-1.5 text-sm rounded-full border border-purple-400/30 text-purple-200"
            >
                {skill}
            </span>
            ))}
        </div>

            



        </div>

        
    </section>
    


    );
}