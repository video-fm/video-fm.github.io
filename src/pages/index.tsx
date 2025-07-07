import Head from 'next/head';

export default function Home() {
  const videos = [
    { src: '/annotated_videos/1.mp4', title: 'Video 1' },
    { src: '/annotated_videos/2.mp4', title: 'Video 2' },
    { src: '/annotated_videos/3.mp4', title: 'Video 3' },
    { src: '/annotated_videos/4.mp4', title: 'Video 4' },
    { src: '/annotated_videos/5.mp4', title: 'Video 5' },
    { src: '/annotated_videos/6.mp4', title: 'Video 6' },
  ];

  const authors = [
    {
      name: "Jiani Huang",
      website: "https://www.cis.upenn.edu/~jianih/",
      affiliations: [1],
    },
    {
      name: "Ziyang Li",
      website: "https://liby99.github.io/",
      affiliations: [1],
    },
    {
      name: "Mayur Naik",
      website: "https://www.cis.upenn.edu/~mhnaik/",
      affiliations: [1],
    },
    {
      name: "Ser-Nam Lim",
      website: "https://ai.ucf.edu/person/ser-nam-lim/",
      affiliations: [2],
    },
  ];

  const affiliations = [
    { id: 1, name: "University of Pennsylvania" },
    { id: 2, name: "University of Central Florida" },
  ];

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
        <div className="authors-list">
          {authors.map((author, idx) => (
            <span key={author.name}>
              <a href={author.website} target="_blank" rel="noopener noreferrer">
                {author.name}
              </a>
              <sup>
                {author.affiliations.map((num, i) => (
                  <span key={num}>
                    {num}
                    {i < author.affiliations.length - 1 && ","}
                  </span>
                ))}
              </sup>
              {idx < authors.length - 1 && ", "}
            </span>
          ))}
        </div>
        <div className="affiliations-list">
          {affiliations.map((aff, idx) => (
            <span key={aff.id}>
              <sup>{aff.id}</sup> {aff.name}
              {idx < affiliations.length - 1 && ", "}
            </span>
          ))}
        </div>
        <div className="conference">
          <span>ICLR 2025</span>
        </div>
        <div className="links">
          <a className="button" href="https://arxiv.org/abs/2304.07647" target="_blank" rel="noopener noreferrer">
            📄 Paper
          </a>
          <a className="button" href="https://github.com/video-fm/LASER" target="_blank" rel="noopener noreferrer">
            💻 Code
          </a>
          <a className="button" href="http://localhost:8000" target="_blank" rel="noopener noreferrer">
            📊 Dataset
          </a>
        </div>
        
        <div className="video-section">
          <div className="video-grid">
            {videos.map((video, index) => (
              <div key={index} className="video-item">
                <video 
                  src={video.src} 
                  className="video-gif"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            ))}
          </div>
          <div className="video-caption">
            videos annotated with generated Spatio-Temporal Scene Graphs
          </div>
        </div>

        <div className='Overview'>
          <h2 className='section-title'>Overview</h2>
        </div>
        <div className="overview-highlight">
          Supervised approaches for learning spatio-temporal scene graphs (STSG) from video are greatly hindered due to their reliance on STSG-annotated videos, which are labor-intensive to construct at scale. Is it feasible to instead use readily available video captions as weak supervision? To address this question, we propose <b>LASER</b>, a neuro-symbolic framework to enable training STSG generators using only video captions. LASER employs large language models to first extract logical specifications with rich spatio-temporal semantic information from video captions. LASER then trains the underlying STSG generator to align the predicted STSG with the specification. The alignment algorithm overcomes the challenges of weak supervision by leveraging a differentiable symbolic reasoner and using a combination of contrastive, temporal, and semantics losses. The overall approach efficiently trains low-level perception models to extract a fine-grained STSG that conforms to the video caption. In doing so, it enables a novel methodology for learning STSGs without tedious annotations. We evaluate our method on three video datasets: OpenPVSG, 20BN, and MUGEN.
        </div>
      </main>
    </>
  );
}