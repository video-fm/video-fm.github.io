import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>LASER: A Neuro-Symbolic Framework for Learning Spatio-Temporal Scene Graphs with Weak Supervision</title>
        <meta name="description" content="ICLR 2025 Paper: LASER" />
      </Head>
      <main className="container">
        <h1 className="title">
          LASER: A Neuro-Symbolic Framework for Learning Spatio-Temporal Scene Graphs with Weak Supervision
        </h1>
        <div className="authors">
          Jiani Huang, Ziyang Li, Mayur Naik, Ser-Nam Lim
        </div>
        <div className="conference">
          <span>ICLR 2025</span>
        </div>
        <div className="links">
          <a className="button" href="https://arxiv.org/abs/your-paper-link" target="_blank" rel="noopener noreferrer">
            📄 Paper
          </a>
          <a className="button" href="https://github.com/your-repo-link" target="_blank" rel="noopener noreferrer">
            💻 Code
          </a>
          <a className="button" href="http://localhost:5173" target="_blank" rel="noopener noreferrer">
            🚀 Demo
          </a>
        </div>
      </main>
    </>
  );
}