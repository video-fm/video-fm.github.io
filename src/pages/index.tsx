import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
              <Head>
        <title>VINE: Video Intelligence Foundation Model</title>
        <meta name="description" content="VINE: A Foundation Model for Video Understanding" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-brand">
            <img 
              src="/images/logo.png" 
              alt="VINE Logo"
              className="nav-logo"
            />
            <div className="nav-text">
              <span className="brand-text">VINE</span>
              <span className="brand-subtitle">A Foundation Model for Video Understanding</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-title-container">
                <h1 className="hero-title">
                  VINE: A Foundation Model for Video Understanding
                </h1>
                <div className="hero-logo">
                  <img 
                    src="/images/logo.png" 
                    alt="VINE Logo"
                    className="hero-logo-image"
                  />
                </div>
              </div>
              <div className="hero-quote">
                "If a picture is worth 1000 words, how many is a video worth?"
              </div>
              <p className="hero-description">
                Video understanding is the future. There is a wealth of data locked inside video that traditional methods cannot unlock. Our foundation model helps extract meaningful insights from real-time video data, with future applications in healthcare monitoring, robotic perception, and security analysis.
              </p>
              <p className="hero-description">
                VINE is a foundation model specifically designed for real-time video understanding, providing unprecedented capabilities for extracting spatio-temporal scene graphs from video data.
              </p>
              <div className="hero-actions">
                <a href="#" className="demo-button">
                  <span className="button-icon">▶</span>
                  Try the demo
                </a>
              </div>
            </div>
          </div>
        </div>
        
                {/* Hero Videos */}
        <div className="hero-videos">
          <div className="video-grid-hero video-grid-two">
            <div className="video-item">
              <video 
                src="/annotated_videos/2.mp4"
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
            <div className="video-item">
              <video 
                src="/annotated_videos/4.mp4"
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
          <div className="hero-video-caption">
            VINE running on videos, outputting the scene graph for each frame
          </div>
        </div>
      </section>

      <main className="main-content">
        {/* Modularity Section */}
        <section className="section">
          <div className="section-container">
            <h2 className="section-title">Modularity</h2>
            <p className="section-description">
              VINE's architecture is designed with flexibility at its core, allowing seamless integration with various state-of-the-art segmentation models. VINE can leverage Grounding Dino, YOLO, or SAM for highly accurate zero-shot segmentation—all without modifying the core framework. This modular design means you can choose the segmentation backend that best fits your use case: prioritize speed with YOLO for live applications, accuracy with SAM for detailed analysis, or flexibility with DINO for open world detection. The segmentation module feeds its masks or bounding boxes into our fine-tuned CLIP model, which then generates the spatio-temporal scene graph. This plug-and-play approach ensures VINE stays current with advances in computer vision while maintaining consistent downstream performance.
            </p>
            
            <div className="content-grid">
              <div className="video-showcase">
                <video 
                  src="/annotated_videos/1.mp4"
                  className="showcase-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="video-caption">
                  VINE run with SAM with masks
                </div>
              </div>
              <div className="video-showcase">
                <video 
                  src="/annotated_videos/7.mp4"
                  className="showcase-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="video-caption">
                  VINE run with Grounding DINO with bounding boxes
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Efficiency Section */}
        <section className="section section-gray">
          <div className="section-container">
            <h2 className="section-title">Efficiency</h2>
            <p className="section-description">
              VINE is engineered for speed and accessibility, running smoothly on everything from consumer CPUs to high-end GPUs and cloud TPUs. Unlike heavyweight video understanding models that demand specialized hardware, VINE's efficient late fusion architecture keeps computational requirements minimal while maintaining real-time performance. The framework is compatible with both PyTorch and JAX, allowing developers to leverage their preferred ecosystem and hardware acceleration. 
            </p>
            
            {/* Performance Tables - Placeholder */}
            <div className="performance-tables">
              <div className="table-container">
                <h3 className="table-title">Performance Benchmarks</h3>
                <div className="table-placeholder">
                  <div className="placeholder-content">
                    <div className="placeholder-text">Performance comparison tables will be displayed here</div>
                    <div className="placeholder-subtext">Hardware compatibility and inference speed metrics</div>
                  </div>
                </div>
              </div>
              
              <div className="table-container">
                <h3 className="table-title">Hardware Compatibility</h3>
                <div className="table-placeholder">
                  <div className="placeholder-content">
                    <div className="placeholder-text">Hardware support matrix will be displayed here</div>
                    <div className="placeholder-subtext">CPU, GPU, and TPU performance metrics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Zero-shot Generalizability Section */}
        <section className="section">
          <div className="section-container">
            <h2 className="section-title">Zero-shot Generalizability</h2>
            <p className="section-description">
              VINE has learned a general notion of what scene graphs are -- this understanding enables zero-shot generalization to unfamiliar objects and actions without requiring additional training. We show VINE on an action localization task without any further finetuning.
            </p>
            
            <div className="single-video-showcase">
              <video 
                src="/annotated_videos/8.mp4"
                className="feature-video"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="video-caption">
                Zero-shot action localization without additional training
              </div>
            </div>
          </div>
        </section>

        {/* Promptability and Finetunability Section */}
        <section className="section section-gray">
          <div className="section-container">
            <h2 className="section-title">Promptability and Finetunability</h2>
            <div className="placeholder-section">
              <div className="placeholder-content">
                <div className="placeholder-text">Promptability and Finetunability content coming soon</div>
                <div className="placeholder-subtext">VINE can be adapted to downstream tasks through various prompting and fine-tuning strategies</div>
              </div>
            </div>
          </div>
        </section>

        {/* Dataset Section */}
        <section className="section">
          <div className="section-container">
            <h2 className="section-title">Dataset</h2>
            
            <div className="dataset-header">
              <h3 className="dataset-name">ESCA-Video-87K</h3>
              <p className="dataset-tagline">A new benchmark for video understanding</p>
            </div>
            
            <div className="dataset-layout">
              <div className="dataset-content">
                <div className="dataset-description">
                  <p className="dataset-overview">
                    <strong>87,045 video clips</strong> curated and annotated to push the boundaries of video understanding. Each clip is paired with rich, natural language captions crafted by GPT-4.
                  </p>
                  
                  <p className="dataset-details">
                    Our dataset uses precise object traces, dynamically segmented using Grounding DINO and SAM2. With programmatic specifications built in linear temporal logic, every clip becomes a structured video you can track, query, and reason about—frame by frame.
                  </p>
                </div>
              </div>
              
              <div className="dataset-video-showcase">
                <video 
                  src="/annotated_videos/dataset.mp4"
                  className="dataset-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="video-caption">
                  ESCA-Video-87K dataset samples  
                </div>
              </div>
            </div>
            
            <div className="dataset-stats">
              <div className="stat-item">
                <div className="stat-number">87K+</div>
                <div className="stat-label">Video Clips</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">GPT-4</div>
                <div className="stat-label">Generated Captions</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">LTL</div>
                <div className="stat-label">Specifications</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">Dynamic</div>
                <div className="stat-label">Segmentation</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section team">
          <div className="section-container">
            <h2 className="section-title">Team</h2>
            
            <div className="team-grid">
              <div className="team-category">
                <h3 className="team-title">Core Contributors</h3>
                <div className="team-members">
                  <div className="team-member">
                    <div className="member-name">Jiani Huang</div>
                    <div className="member-affiliation">University of Pennsylvania</div>
                  </div>
                  <div className="team-member">
                    <div className="member-name">Amish Sethi</div>
                    <div className="member-affiliation">University of Pennsylvania</div>
                  </div>
                  <div className="team-member">
                    <div className="member-name">Matthew Kuo</div>
                    <div className="member-affiliation">University of Pennsylvania</div>
                  </div>
                </div>
              </div>

              <div className="team-category">
                <h3 className="team-title">Collaborators</h3>
                <div className="team-members">
                  <div className="team-member">
                    <div className="member-name">Ziyang Li</div>
                    <div className="member-affiliation">University of Pennsylvania</div>
                  </div>
                  <div className="team-member">
                    <div className="member-name">Mayank Keoliya</div>
                    <div className="member-affiliation">University of Pennsylvania</div>
                  </div>
                  <div className="team-member">
                    <div className="member-name">Neelay Velingker</div>
                    <div className="member-affiliation">University of Pennsylvania</div>
                  </div>
                </div>
              </div>

              <div className="team-category">
                <h3 className="team-title">Faculty</h3>
                <div className="team-members">
                  <div className="team-member">
                    <div className="member-name">Mayur Naik</div>
                    <div className="member-affiliation">University of Pennsylvania</div>
                  </div>
                  <div className="team-member">
                    <div className="member-name">Sernam Lim</div>
                    <div className="member-affiliation">University of Central Florida</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="penn-logo-section">
              <div className="penn-logo">
                <img 
                  src="/images/penn_logo.png" 
                  alt="University of Pennsylvania Logo"
                  className="penn-logo-image"
                />
                <div className="penn-text">University of Pennsylvania</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}