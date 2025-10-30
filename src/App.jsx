import { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll, Html, Environment, Float } from '@react-three/drei';
import TownScene from './components/TownScene.jsx';
import projectData from './data/projects.js';

function SceneExperience({ onFocusChange }) {
  const scroll = useScroll();
  const lastIndex = useRef(-1);

  useFrame(() => {
    const ratio = scroll.offset;
    const focusIndex = Math.min(
      projectData.landmarks.length - 1,
      Math.floor(ratio * projectData.landmarks.length * 1.1)
    );

    if (focusIndex !== lastIndex.current) {
      lastIndex.current = focusIndex;
      onFocusChange(projectData.landmarks[focusIndex]);
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.25} floatIntensity={0.8}>
        <TownScene />
      </Float>
      <Environment preset="sunset" background blur={0.7} />
    </group>
  );
}

function OverlayContent({ activeLandmark }) {
  return (
    <Scroll html>
      <div className="overlay-content">
        <span className="tag">Featured Focus</span>
        <h2>{activeLandmark.title}</h2>
        <p>{activeLandmark.highlight}</p>
      </div>
    </Scroll>
  );
}

export default function App() {
  const [activeLandmark, setActiveLandmark] = useState(projectData.landmarks[0]);

  return (
    <main>
      <section className="hero">
        <div>
          <h1>Shaping resilient infrastructure through immersive storytelling</h1>
          <p>
            I’m Athallah Naufal, a civil engineer specializing in infrastructure systems for modern
            cities. Dive into a living model of the projects I’ve led—from hydroelectric dams to
            smart transit corridors.
          </p>
          <a className="cta" href="#projects">
            Explore Projects →
          </a>
        </div>
        <div className="scene-wrapper">
          <Canvas camera={{ position: [9, 9, 9], fov: 45 }} shadows>
            <color attach="background" args={["#07111d"]} />
            <ambientLight intensity={0.8} />
            <directionalLight
              position={[10, 12, 5]}
              intensity={1.2}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <Suspense fallback={<Html center>Loading the town…</Html>}>
              <ScrollControls damping={0.3} pages={3}>
                <SceneExperience onFocusChange={setActiveLandmark} />
                <OverlayContent activeLandmark={activeLandmark} />
                <Scroll>
                  <group position={[0, -3, 0]}>
                    <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                      <planeGeometry args={[60, 60]} />
                      <meshStandardMaterial color="#04080f" />
                    </mesh>
                  </group>
                </Scroll>
              </ScrollControls>
            </Suspense>
          </Canvas>
          <div className="scroll-indicator">
            Scroll
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="info-panels">
          <div className="panel">
            <h2>Immersive engineering narratives</h2>
            <p>
              Every landmark in the town represents a project that blends technical rigor with
              human-centered design. Scroll through the scene to see how each system connects to the
              broader urban ecosystem.
            </p>
          </div>
          <div className="panels-grid">
            {projectData.landmarks.map((landmark) => (
              <article className="panel" key={landmark.id}>
                <h3>{landmark.title}</h3>
                <p>{landmark.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="panel">
          <h2>Experience &amp; impact</h2>
          <p>
            From flood-resilient riverfronts to automated pump stations, I lead projects that merge
            sustainability with immersive stakeholder storytelling.
          </p>
          <div className="timeline">
            {projectData.timeline.map((item) => (
              <div className="timeline-item" key={item.title}>
                <div className="timeline-marker" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Athallah Naufal. All rights reserved.</footer>
    </main>
  );
}
