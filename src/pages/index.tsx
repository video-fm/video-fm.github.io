import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

function PromptabilityDemo() {
  const [selectedObjects, setSelectedObjects] = useState('["person","sofa"]');
  const [isLoading, setIsLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');

  const objectOptions = [
    { value: '["person","sofa"]', label: 'person, sofa', video: '/annotated_videos/12.mp4' },
    { value: '["sofa","dog"]', label: 'sofa, dog', video: '/annotated_videos/13.mp4' },
    { value: '["person","dog"]', label: 'person, dog', video: '/annotated_videos/14.mp4' }
  ];

  const handlePlay = () => {
    setIsLoading(true);
    setShowVideo(false);
    
    // Find the selected option and get the corresponding video
    const selectedOption = objectOptions.find(option => option.value === selectedObjects);
    if (selectedOption) {
      setCurrentVideo(selectedOption.video);
    }
    
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
      setShowVideo(true);
    }, 1500);
  };

  // Automatically play/pause the four zero-shot videos based on their
  // visibility in the viewport. This respects iOS Safari’s autoplay rules
  // (video must be muted, inline, and *visible*) without resorting to the
  // manual load()/play() workaround that was causing blank frames on mobile.
  useEffect(() => {
    const zeroShotVideos = document.querySelectorAll('.zero-shot-video') as NodeListOf<HTMLVideoElement>;

    if (!('IntersectionObserver' in window)) {
      // Fallback – just attempt to play them once.
      zeroShotVideos.forEach(v => v.play().catch(() => {}));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    zeroShotVideos.forEach(video => observer.observe(video));

    // If Safari still blocks autoplay, fall back to a single user-gesture.
    const handleFirstTouch = () => {
      zeroShotVideos.forEach(video => {
        const rect = video.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) video.play().catch(() => {});
      });
      document.removeEventListener('touchstart', handleFirstTouch);
    };

    document.addEventListener('touchstart', handleFirstTouch, { once: true });

    return () => {
      zeroShotVideos.forEach(video => observer.unobserve(video));
      document.removeEventListener('touchstart', handleFirstTouch);
    };
  }, []);

  return (
    <div className="promptability-demo">
      <div className="demo-container">
        <div className="input-section">
          <div className="input-group">
            <label className="input-label">Objects to prompt:</label>
            <div className="input-controls">
              <select 
                value={selectedObjects}
                onChange={(e) => setSelectedObjects(e.target.value)}
                className="objects-dropdown"
              >
                {objectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button 
                onClick={handlePlay}
                className="play-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <span className="play-icon">▶</span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="demo-output">
          {isLoading && (
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-spinner large"></div>
                <p className="loading-text">Processing VINE prompt...</p>
              </div>
            </div>
          )}
          
          {showVideo && currentVideo && (
            <div className="video-result">
              <video 
                src={currentVideo}
                className="prompt-video"
                autoPlay
                muted
                loop
                playsInline
                key={currentVideo}
              />
              <div className="result-caption">
                VINE adapting to different object prompts in real-time
              </div>
            </div>
          )}
          
          {!isLoading && !showVideo && (
            <div className="demo-placeholder">
              <div className="placeholder-icon">🎯</div>
              <p>Select objects and click play to see VINE in action</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
                Every second, millions of hours of video capture complex human behaviors, environmental changes, and intricate interactions. While humans can easily comprehend these visual narratives, teaching machines to do so remains a long-standing and fundamental challenge in artificial intelligence.
              </p>
              <p className="hero-description">
                VINE is a foundation model for video understanding. It extracts meaningful insights from video for applications in healthcare monitoring, robotic perception, security analysis, and many other domains.
              </p>
              <p className="hero-description">
                VINE transforms raw video into structured knowledge. Specifically designed for real-time deployment, it provides unprecedented capabilities for extracting spatio-temporal scene graphs from video data. It comprehends not just individual frames but the rich temporal relationships and spatial dynamics that define real-world events.
              </p>
              <p className="hero-description">
                From detecting early signs of deterioration in hospitalized patients to enabling robots to navigate complex social environments, VINE is the first foundation model for video understanding that is both versatile and efficient.
              </p>
              <div className="hero-actions">
                <a href="https://colab.research.google.com/drive/1J_kjrGCEXsbLXfze8bX9omHk953ylM4A?usp=sharing" target="_blank" rel="noopener noreferrer" className="demo-button">
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
            
            {/* Performance Tables */}
            <div className="performance-tables">
              <div className="table-container">
                <h3 className="table-title">Inference Performance</h3>
                <div className="efficiency-table-container">
                  <table className="efficiency-table">
                    <thead>
                      <tr>
                        <th>Hardware</th>
                        <th>Average Time per Frame</th>
                        <th>FPS</th>
                        <th>Framework</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="hardware-cell">CPU</td>
                        <td className="time-cell">56.94ms</td>
                        <td className="fps-cell">17.6</td>
                        <td className="framework-cell">PyTorch</td>
                      </tr>
                      <tr>
                        <td className="hardware-cell">H100 GPU</td>
                        <td className="time-cell highlight">17.06ms</td>
                        <td className="fps-cell highlight">58.6</td>
                        <td className="framework-cell">PyTorch</td>
                      </tr>
                        <td className="hardware-cell">H100 GPU</td>
                        <td className="time-cell placeholder">13.63ms</td>
                        <td className="fps-cell placeholder">73.37</td>
                        <td className="framework-cell">JAX</td>
                    </tbody>
                  </table>
                </div>
                <p className="efficiency-caption">
                  Forward pass timing results for VINE model inference per frame across different hardware configurations.
                </p>
              </div>
              
              <div className="table-container">
                <h3 className="table-title">Hardware Compatibility</h3>
                <div className="compatibility-grid">
                  <div className="compatibility-item">
                    <div className="compatibility-icon">🖥️</div>
                    <h4>CPU Support</h4>
                    <p>Low resource allows fast CPU inference with low memory usage</p>
                  </div>
                  <div className="compatibility-item">
                    <div className="compatibility-icon">⚡</div>
                    <h4>GPU Acceleration</h4>
                    <p>CUDA-enabled GPUs for high-performance inference</p>
                  </div>
                  <div className="compatibility-item">
                    <div className="compatibility-icon">🔧</div>
                    <h4>Framework Flexibility</h4>
                    <p>Compatible with both PyTorch and JAX ecosystems</p>
                  </div>
                  <div className="compatibility-item">
                  <div className="compatibility-icon">💾</div>
                    <h4>Memory Efficient</h4>
                    <p>Low memory footprint enables deployment on resource-constrained devices</p>
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
              VINE has learned a general notion of what scene graphs are -- this understanding enables zero-shot generalization to unfamiliar objects and actions without requiring additional training. We show VINE on various action localization tasks without any further finetuning.
            </p>
            
            <div className="zero-shot-videos">
              <div className="video-grid-four">
                <div className="video-item">
                  <video 
                    src="/annotated_videos/8.mov"
                    className="zero-shot-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    controls={false}
                    style={{pointerEvents: 'none'}}
                  />
                </div>
                <div className="video-item">
                  <video 
                    src="/annotated_videos/9.mov"
                    className="zero-shot-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    controls={false}
                    style={{pointerEvents: 'none'}}
                  />
                </div>
                <div className="video-item">
                  <video 
                    src="/annotated_videos/10.mov"
                    className="zero-shot-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    controls={false}
                    style={{pointerEvents: 'none'}}
                  />
                </div>
                <div className="video-item">
                  <video 
                    src="/annotated_videos/11.mov"
                    className="zero-shot-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    controls={false}
                    style={{pointerEvents: 'none'}}
                  />
                </div>
              </div>
              <div className="video-caption">
                Zero-shot action localization across diverse scenarios without additional training
              </div>
            </div>
          </div>
        </section>

        {/* Promptability and Finetunability Section */}
        <section className="section section-gray">
          <div className="section-container">
            <h2 className="section-title">Promptability and Finetunability</h2>
            <p className="section-description">
              VINE's foundation architecture enables powerful downstream adaptation through both prompting and fine-tuning strategies. The model can be dynamically prompted to focus on specific objects and relationships, returning probabilistic confidence scores for detected entities and their interactions.
            </p>
            
            <PromptabilityDemo />
            
            <div className="promptability-content">
              <div className="content-grid">
                <div className="feature-block">
                  <h3 className="feature-title">Probabilistic Prompting</h3>
                  <p className="feature-description">
                    VINE operates probabilistically, allowing you to prompt for specific objects, actions, or relationships and receive confidence scores for all detected entities. Rather than binary detection, VINE provides  probability distributions across the entire scene graph, enabling fine-grained control over what the model focuses on during inference.
                  </p>

                </div>
                
                <div className="feature-block">
                  <h3 className="feature-title">Fine-tuning & Adaptation</h3>
                  <p className="feature-description">
                    Beyond prompting, VINE can be efficiently fine-tuned for specialized tasks. The modular architecture enables task-specific adaptation through either full finetuning or parameter-efficient techniques while preserving the core video understanding capabilities, making it suitable for domain-specific applications in various fields.
                  </p>
    
                </div>
                              </div>
               
               <div className="performance-results">
                 <h3 className="results-title">Finetuned Action Recognition Performance</h3>
                 <p className="results-description">
                   VINE demonstrates strong performance on action recognition across different training scenarios on <a href="http://activity-net.org/index.html" target="_blank" rel="noopener noreferrer" className="inline-link">ActivityNet</a>. VINE uses SGClip as its backbone architecture for scene graph generation. We compare against state-of-the-art action recognition models including BIKE, Text4Vis, ResT, and E2E, showing competitive zero-shot and finetuned capabilities.
                 </p>
                 
                 <div className="performance-table-container">
                   <table className="performance-table">
                     <thead>
                       <tr>
                         <th>Category</th>
                         <th>Model</th>
                         <th>ActivityNet Accuracy (%)</th>
                       </tr>
                     </thead>
                     <tbody>
                       <tr className="category-row">
                         <td rowSpan={6} className="category-cell">Zero-shot</td>
                         <td>VINE</td>
                         <td className="accuracy-cell">76.34</td>
                       </tr>
                       <tr>
                         <td>CLIP</td>
                         <td className="accuracy-cell">74.37</td>
                       </tr>
                       <tr>
                         <td>BIKE</td>
                         <td className="accuracy-cell highlight">80.00</td>
                       </tr>
                       <tr>
                         <td>Text4vis</td>
                         <td className="accuracy-cell">77.40</td>
                       </tr>
                       <tr>
                         <td>ResT</td>
                         <td className="accuracy-cell">26.30</td>
                       </tr>
                       <tr>
                         <td>E2E</td>
                         <td className="accuracy-cell">20.00</td>
                       </tr>
                       <tr className="category-row">
                         <td rowSpan={2} className="category-cell">Few-shot (1%)</td>
                         <td>VINE</td>
                         <td className="accuracy-cell highlight">80.10</td>
                       </tr>
                       <tr>
                         <td>CLIP</td>
                         <td className="accuracy-cell">78.79</td>
                       </tr>
                       <tr className="category-row">
                         <td rowSpan={2} className="category-cell">Few-shot (5%)</td>
                         <td>VINE</td>
                         <td className="accuracy-cell highlight">86.05</td>
                       </tr>
                       <tr>
                         <td>CLIP</td>
                         <td className="accuracy-cell">80.02</td>
                       </tr>

                     </tbody>
                   </table>
                 </div>
                 
                 <p className="table-caption">
                   Action recognition accuracy on ActivityNet for zero-shot and few-shot (finetuned on 1% and 5% of the data) models. Zero-shot baselines include state-of-the-art action recognition models (BIKE, Text4Vis, ResT, E2E) and our models evaluated without training.
                 </p>
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
                <div className="stat-number">100</div>
                <div className="stat-label">Trajectories per vid</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">500k+</div>
                <div className="stat-label">Masks</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">GPT-4</div>
                <div className="stat-label">Captions</div>
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
                    <div className="member-name">
                      <a href="https://amishsethi.github.io/personal-website/" target="_blank" rel="noopener noreferrer">Amish Sethi</a>
                    </div>
                    <div className="member-affiliation">University of Pennsylvania</div>
                  </div>
                  <div className="team-member">
                    <div className="member-name">
                      <a href="https://www.cis.upenn.edu/~jianih/" target="_blank" rel="noopener noreferrer">Jiani Huang</a>
                    </div>
                    <div className="member-affiliation">University of Pennsylvania</div>
                  </div>
                  <div className="team-member">
                    <div className="member-name">
                      <a href="https://www.linkedin.com/in/kuomat/" target="_blank" rel="noopener noreferrer">Matthew Kuo</a>
                    </div>
                    <div className="member-affiliation">University of Pennsylvania</div>
                  </div>
                </div>
              </div>

              <div className="team-category">
                <h3 className="team-title">Collaborators</h3>
                <div className="team-members">
                  <div className="team-member">
                    <div className="member-name">
                      <a href="https://liby99.github.io/" target="_blank" rel="noopener noreferrer">Ziyang Li</a>
                    </div>
                    <div className="member-affiliation">University of Pennsylvania</div>
                  </div>
                  <div className="team-member">
                    <div className="member-name">
                      <a href="https://www.seas.upenn.edu/~mkeoliya/" target="_blank" rel="noopener noreferrer">Mayank Keoliya</a>
                    </div>
                    <div className="member-affiliation">University of Pennsylvania</div>
                  </div>
                  <div className="team-member">
                    <div className="member-name">
                      <a href="https://nvelingker.github.io/" target="_blank" rel="noopener noreferrer">Neelay Velingker</a>
                    </div>
                    <div className="member-affiliation">University of Pennsylvania</div>
                  </div>
                </div>
              </div>

              <div className="team-category">
                <h3 className="team-title">Faculty</h3>
                <div className="team-members">
                  <div className="team-member">
                    <div className="member-name">
                      <a href="https://www.cis.upenn.edu/~mhnaik/" target="_blank" rel="noopener noreferrer">Mayur Naik</a>
                    </div>
                    <div className="member-affiliation">University of Pennsylvania</div>
                  </div>
                  <div className="team-member">
                    <div className="member-name">
                      <a href="https://sites.google.com/site/sernam" target="_blank" rel="noopener noreferrer">Sernam Lim</a>
                    </div>
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
