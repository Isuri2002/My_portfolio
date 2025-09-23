export default function Cv() {
  return (
    <section className="py-20">
      <div className="bg-white dark:bg-dark/50 rounded-lg shadow-md overflow-hidden animate-slide-up">
        <div className="p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left side: Title + Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Download My CV</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Get a detailed look at my experience, skills, and projects by downloading my CV.  
                  Perfect for recruiters, collaborators, or anyone interested in my work.
                </p>
              </div>

              {/* Right side: Download Button */}
              <div className="flex sm:justify-end">
                <a
                  href="/files/MyCV.pdf" // 👈 place your CV file in public/files/MyCV.pdf
                  download
                  className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
