import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Github,
  Linkedin,
  Menu,
  X,
} from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import projectList from "./components/project_list";
import "./App.css";

const fields = {
  10: "Construction software",
  1: "Voice intelligence",
  2: "Conversational systems",
  3: "Message intelligence",
};
const projects = projectList.map((project, index) => ({
  ...project,
  number: String(index + 1).padStart(2, "0"),
  field: fields[project.id],
}));

function Header({ open, setOpen }) {
  const [pastIntro, setPastIntro] = useState(false);
  useEffect(() => {
    const update = () => {
      const intro = document.getElementById("top");
      setPastIntro(
        window.scrollY > (intro?.offsetHeight || window.innerHeight) - 90,
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <header className={`header ${pastIntro ? "past-intro" : ""}`}>
      <a className="wordmark" href="#top">
        KH
      </a>
      <nav className={open ? "open" : ""}>
        <a href="#projects" onClick={() => setOpen(false)}>
          Projects
        </a>
        <a href="#about" onClick={() => setOpen(false)}>
          About
        </a>
        <a href="#experience" onClick={() => setOpen(false)}>
          Experience
        </a>
        <a href="#contact" onClick={() => setOpen(false)}>
          Contact
        </a>
      </nav>
      <a
        className="resume-link"
        href="/KodyHatcherResumeMain.pdf"
        target="_blank"
        rel="noreferrer"
      >
        Resume <ArrowUpRight />
      </a>
      <button
        className="menu"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function ComputationalField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return undefined;

    const context = canvas.getContext("2d");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame;
    let points = [];
    let columns = 0;
    let rows = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: 0, y: 0, active: false };
    const portraitFocus = { x: 0, y: 0, active: false };

    const buildField = () => {
      const bounds = container.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height - 64;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      columns = Math.max(9, Math.ceil(width / 105));
      rows = Math.max(7, Math.ceil(height / 105));
      points = [];
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const seed = row * columns + column + 1;
          const baseX =
            ((column + 0.5) / columns) * width + Math.sin(seed * 12.73) * 16;
          const baseY =
            ((row + 0.5) / rows) * height + Math.cos(seed * 8.91) * 14;
          points.push({ x: baseX, y: baseY, baseX, baseY, seed, row, column });
        }
      }

      const portrait = container.querySelector(".hero-portrait");
      if (portrait) {
        const portraitBounds = portrait.getBoundingClientRect();
        portraitFocus.x =
          portraitBounds.left - bounds.left + portraitBounds.width * 0.55;
        portraitFocus.y =
          portraitBounds.top - bounds.top - 64 + portraitBounds.height * 0.48;
        portraitFocus.active = true;
      }
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const influence = Math.min(280, width * 0.25);

      points.forEach((point) => {
        const pointerDeltaX = point.baseX - pointer.x;
        const pointerDeltaY = point.baseY - pointer.y;
        const pointerDistance = Math.hypot(pointerDeltaX, pointerDeltaY) || 1;
        const portraitDeltaX = point.baseX - portraitFocus.x;
        const portraitDeltaY = point.baseY - portraitFocus.y;
        const portraitDistance =
          Math.hypot(portraitDeltaX, portraitDeltaY) || 1;
        const pointerForce =
          pointer.active && pointerDistance < influence
            ? ((influence - pointerDistance) / influence) ** 2 * 58
            : 0;
        const portraitForce =
          portraitFocus.active && portraitDistance < influence
            ? ((influence - portraitDistance) / influence) ** 2 * 58
            : 0;
        const ambientX = Math.sin(time * 0.00045 + point.seed) * 2.4;
        const ambientY = Math.cos(time * 0.00038 + point.seed * 0.7) * 2.4;
        const targetX =
          point.baseX +
          (pointerDeltaX / pointerDistance) * pointerForce +
          (portraitDeltaX / portraitDistance) * portraitForce +
          ambientX;
        const targetY =
          point.baseY +
          (pointerDeltaY / pointerDistance) * pointerForce +
          (portraitDeltaY / portraitDistance) * portraitForce +
          ambientY;
        point.x += (targetX - point.x) * 0.09;
        point.y += (targetY - point.y) * 0.09;
      });

      points.forEach((point, index) => {
        const neighbors = [];
        if (point.column < columns - 1) neighbors.push(points[index + 1]);
        if (point.row < rows - 1) neighbors.push(points[index + columns]);
        if (
          point.seed % 4 === 0 &&
          point.column < columns - 1 &&
          point.row < rows - 1
        )
          neighbors.push(points[index + columns + 1]);

        neighbors.forEach((neighbor) => {
          const middleX = (point.x + neighbor.x) / 2;
          const middleY = (point.y + neighbor.y) / 2;
          const pointerDistance = Math.hypot(
            middleX - pointer.x,
            middleY - pointer.y,
          );
          const portraitDistance = Math.hypot(
            middleX - portraitFocus.x,
            middleY - portraitFocus.y,
          );
          const pointerIntensity =
            pointer.active && pointerDistance < influence
              ? 1 - pointerDistance / influence
              : 0;
          const portraitIntensity =
            portraitFocus.active && portraitDistance < influence
              ? 1 - portraitDistance / influence
              : 0;
          const intensity = Math.max(pointerIntensity, portraitIntensity);
          const highlighted = intensity > 0;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(neighbor.x, neighbor.y);
          context.strokeStyle = highlighted
            ? `rgba(54, 82, 255, ${0.16 + intensity * 0.55})`
            : "rgba(255,255,255,0.075)";
          context.lineWidth = highlighted ? 0.7 + intensity : 0.55;
          context.stroke();
        });

        const pointerDistance = Math.hypot(
          point.x - pointer.x,
          point.y - pointer.y,
        );
        const portraitDistance = Math.hypot(
          point.x - portraitFocus.x,
          point.y - portraitFocus.y,
        );
        const pointerIntensity =
          pointer.active && pointerDistance < influence
            ? 1 - pointerDistance / influence
            : 0;
        const portraitIntensity =
          portraitFocus.active && portraitDistance < influence
            ? 1 - portraitDistance / influence
            : 0;
        const localIntensity = Math.max(pointerIntensity, portraitIntensity);
        const close = localIntensity > 0;
        context.beginPath();
        context.arc(
          point.x,
          point.y,
          close
            ? 1.4 + localIntensity * 1.8
            : point.seed % 13 === 0
              ? 1.7
              : 0.9,
          0,
          Math.PI * 2,
        );
        context.fillStyle =
          close || point.seed % 13 === 0
            ? "rgba(67, 92, 255, 0.92)"
            : "rgba(255,255,255,0.38)";
        context.fill();
      });

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    const locatePointer = (event) => {
      const bounds = container.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top - 64;
      pointer.active = pointer.y >= 0;
    };
    const enter = (event) => locatePointer(event);
    const leave = () => {
      pointer.active = false;
    };

    const resizeObserver = new ResizeObserver(() => {
      buildField();
      if (reducedMotion) draw();
    });
    buildField();
    resizeObserver.observe(container);
    container.addEventListener("pointermove", enter);
    container.addEventListener("pointerleave", leave);
    draw();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", enter);
      container.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="computation-field" aria-hidden="true" />
  );
}

function Intro() {
  const introRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end start"],
  });
  const firstNameX = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const lastNameX = useTransform(scrollYProgress, [0, 1], [0, 190]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const statementY = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.82], [1, 0.08]);

  return (
    <>
      <svg className="svg-defs" aria-hidden="true">
        <defs>
          <filter id="cmg-navy" colorInterpolationFilters="sRGB">
            <feColorMatrix
              in="SourceGraphic"
              result="cmgMask"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1 -1 -1 0 2.15"
            />
            <feFlood floodColor="#233e68" result="cmgColor" />
            <feComposite in="cmgColor" in2="cmgMask" operator="in" />
          </filter>
        </defs>
      </svg>
      <section ref={introRef} className="intro" id="top">
        <ComputationalField />
        <figure className="hero-portrait">
          <img src="/kody-hero-cutout-v2.png" alt="Kody Hatcher" />
        </figure>
        <div className="intro-main">
          <motion.p
            className="edition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Software engineer · 2026
          </motion.p>
          <motion.h1 style={{ y: nameY, opacity: heroOpacity }}>
            <motion.span
              className="name-first"
              style={{ x: firstNameX }}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Kody
            </motion.span>
            <motion.span
              className="name-last"
              style={{ x: lastNameX }}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Hatcher
            </motion.span>
          </motion.h1>
          <a className="down" href="#projects">
            <ArrowDown /> Project index
          </a>
        </div>
        <motion.div
          className="intro-statement"
          style={{ y: statementY, opacity: heroOpacity }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <p>
            <span>
              Interested in exploring the evolving relationship between
            </span>
            <strong>
              <em>computation</em>, <em>intelligence</em>, and{" "}
              <em>technological progress</em>.
            </strong>
          </p>
        </motion.div>
        <div className="intro-degree">
          Cybersecurity + Artificial Intelligence
          <br />
          University of Nebraska Omaha
        </div>
      </section>
    </>
  );
}

function SectionLabel({ number, children }) {
  return (
    <motion.div
      className="section-label"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
    >
      <span>{number}</span>
      <h2>{children}</h2>
      <motion.i
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}

function Projects({ onSelect }) {
  return (
    <section className="projects section" id="projects">
      <SectionLabel number="01">Project index</SectionLabel>
      <div className="project-list">
        {projects.map((project, index) => (
          <motion.button
            className="project-row"
            key={project.id}
            onClick={() => onSelect(project)}
            initial={{ opacity: 0, y: 35, clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.7,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="project-card-top">
              <span className="project-no">{project.number}</span>
              <span>{project.field}</span>
            </div>
            <strong>{project.title}</strong>
            <p>{project.description}</p>
            <div className="project-card-bottom">
              <span>{project.tech.slice(0, 4).join(" / ")}</span>
              <ArrowUpRight />
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function ProjectDialog({ project, onClose }) {
  useEffect(() => {
    const escape = (event) => event.key === "Escape" && onClose();
    document.body.classList.add("locked");
    window.addEventListener("keydown", escape);
    return () => {
      document.body.classList.remove("locked");
      window.removeEventListener("keydown", escape);
    };
  }, [onClose]);

  return (
    <motion.div
      className="dialog-backdrop"
      onMouseDown={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.article
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onMouseDown={(e) => e.stopPropagation()}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.55 }}
      >
        <div className="dialog-top">
          <span>PROJECT / {project.number}</span>
          <button onClick={onClose} autoFocus>
            Close <X />
          </button>
        </div>
        <div className="dialog-body">
          <p className="dialog-field">{project.field}</p>
          <h2 id="dialog-title">{project.title}</h2>
          <p className="dialog-description">{project.description}</p>
          <div className="dialog-spec">
            <span>Tools</span>
            <div>
              {project.tech.map((item) => (
                <i key={item}>{item}</i>
              ))}
            </div>
            <span>Status</span>
            <p>
              <Check /> Production / Private
            </p>
          </div>
        </div>
        <div className="dialog-footer">
          Repository and demonstration withheld to protect live operational
          systems.
        </div>
      </motion.article>
    </motion.div>
  );
}

function CutoutIllustration() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const source = new Image();
    source.src = "/about-coding-scene.png";
    source.onload = () => {
      if (!mounted || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width = source.naturalWidth;
      canvas.height = source.naturalHeight;
      context.drawImage(source, 0, 0);

      // The generated artwork shipped with a neutral preview grid baked in.
      // Key only those mid-tone neutral pixels so the ink, skin and blue marks remain intact.
      const frame = context.getImageData(0, 0, canvas.width, canvas.height);
      for (let index = 0; index < frame.data.length; index += 4) {
        const red = frame.data[index];
        const green = frame.data[index + 1];
        const blue = frame.data[index + 2];
        const high = Math.max(red, green, blue);
        const low = Math.min(red, green, blue);
        const brightness = (red + green + blue) / 3;
        if (high - low < 9 && brightness > 66 && brightness < 224) {
          frame.data[index + 3] = 0;
        }
      }
      context.putImageData(frame, 0, 0);
    };
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="coding-character"
      role="img"
      aria-label="Illustration of Kody working at a desk"
    />
  );
}

function CodingScene() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [pinnedNode, setPinnedNode] = useState(null);
  const aboutNodes = [
    {
      id: "education",
      number: "01",
      label: "Education",
      title: "My path at UNO",
      description:
        "I’m in the first semester of my senior year at the University of Nebraska Omaha. My two majors are Cybersecurity and Artificial Intelligence. I’m also completing a minor in Computer Science. I chose this path because I wanted to understand how software is built, then learn what it takes to keep that software secure. I expect to graduate in 2027. My current GPA is 3.95.",
      details: [
        "University of Nebraska Omaha",
        "Cybersecurity",
        "Artificial Intelligence",
        "CS minor",
        "3.95 GPA",
        "Expected 2027",
      ],
    },
    {
      id: "interests",
      number: "02",
      label: "Interests",
      title: "Away from the screen",
      description:
        "Travel is probably the fastest way to get me excited about a free weekend. I like landing somewhere unfamiliar and figuring it out as I go, especially when the food is good. Back home, golf scratches a completely different itch. It forces me to slow down and be patient, which is not always easy for me. A great weekend can be as simple as finding a new restaurant with friends. If the weather holds, I’ll probably try to fit in a round too.",
      details: ["Travel", "New food", "Golf", "Time with friends"],
    },
    {
      id: "work",
      number: "03",
      label: "Day to day",
      title: "A typical weekday",
      description:
        "I’m currently a software engineering intern at Workshop. The best part of the role is being trusted to own my work and contribute to the product every day. Most mornings start at the gym before I log on. After work, school takes over. I’m in the first semester of my senior year, so there is almost always something due. I try to leave weekends open for friends. A new restaurant is usually the plan. When there is more time, I travel. Good weather normally means golf.",
      details: [
        "Workshop",
        "Software engineering intern",
        "Senior year",
        "Daily product work",
      ],
    },
    {
      id: "approach",
      number: "04",
      label: "Approach",
      title: "How I like to work",
      description:
        "I like getting close to a problem before I write code. Who is dealing with it? What is slowing them down? Once that is clear, I want enough ownership to carry the solution through and see whether it actually helps. I would rather ship something useful and keep improving it than hide behind a perfect first draft. Trust matters to me too, especially when software touches real work.",
      details: [
        "Ownership",
        "Clear communication",
        "Practical systems",
        "Continuous improvement",
      ],
    },
  ];
  const activeNode = hoveredNode || pinnedNode;
  const selectedNode = aboutNodes.find(({ id }) => id === activeNode);

  const moveScene = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--scene-x", `${x * 14}px`);
    event.currentTarget.style.setProperty("--scene-y", `${y * 10}px`);
  };

  return (
    <motion.figure
      className="coding-scene"
      initial={{ opacity: 0, clipPath: "inset(18% 0 18% 0)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
      viewport={{ once: true, margin: "-110px" }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={moveScene}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--scene-x", "0px");
        event.currentTarget.style.setProperty("--scene-y", "0px");
      }}
    >
      <div className="scene-heading">
        <span>About / Kody Hatcher</span>
        <span className="scene-status">
          <i />{" "}
          {selectedNode
            ? `Viewing / ${selectedNode.label}`
            : "Hover or select a node"}
        </span>
      </div>
      <div className="scene-stage">
        <div className="scene-grid" aria-hidden="true" />
        <motion.div
          className="scene-orbit orbit-one"
          aria-hidden="true"
          initial={{ scale: 0.45, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          <i />
        </motion.div>
        <motion.div
          className="scene-orbit orbit-two"
          aria-hidden="true"
          initial={{ scale: 0.45, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <i />
        </motion.div>

        <motion.div
          className="character-layer"
          initial={{ y: 80, opacity: 0, scale: 0.92 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <CutoutIllustration />
        </motion.div>

        <div
          className="about-nodes"
          aria-label="Explore information about Kody"
        >
          {aboutNodes.map((node, index) => (
            <motion.button
              key={node.id}
              className={`about-node node-${node.id} ${activeNode === node.id ? "active" : ""}`}
              type="button"
              aria-expanded={activeNode === node.id}
              onClick={() =>
                setPinnedNode(pinnedNode === node.id ? null : node.id)
              }
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onFocus={() => setHoveredNode(node.id)}
              onBlur={() => setHoveredNode(null)}
              initial={{ opacity: 0, scale: 0.65 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.55 + index * 0.12,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="node-number">{node.number}</span>
              <span className="node-label">{node.label}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedNode && (
            <motion.div
              className="about-info-layer"
              key={selectedNode.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.aside
                className="about-info-card"
                initial={{ opacity: 0, y: 28, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.97 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="about-card-top">
                  <span>
                    {selectedNode.number} / {selectedNode.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setPinnedNode(null);
                      setHoveredNode(null);
                    }}
                    aria-label={`Close ${selectedNode.label}`}
                  >
                    <X />
                  </button>
                </div>
                <h3>{selectedNode.title}</h3>
                <p>{selectedNode.description}</p>
                <div className="about-card-details">
                  {selectedNode.details.map((detail) => (
                    <span key={detail}>{detail}</span>
                  ))}
                </div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.svg
          className="scene-path"
          viewBox="0 0 1000 420"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d="M34 333 H138 V270 H232 M768 118 H865 V64 H966"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.72, duration: 1.25, ease: "easeInOut" }}
          />
          <motion.circle
            cx="232"
            cy="270"
            r="5"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.65 }}
          />
          <motion.circle
            cx="768"
            cy="118"
            r="5"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.65 }}
          />
        </motion.svg>
      </div>
      <figcaption>
        <span>Hover or click a node</span>
        <b>Omaha, NE</b>
        <a href="/KodyHatcherResumeMain.pdf" target="_blank" rel="noreferrer">
          Résumé <ArrowUpRight />
        </a>
      </figcaption>
    </motion.figure>
  );
}

function About() {
  return (
    <section className="about section" id="about">
      <SectionLabel number="02">About</SectionLabel>
      <CodingScene />
    </section>
  );
}

function Experience() {
  const experiences = [
    {
      id: "workshop",
      number: "03",
      name: "Workshop",
      role: "Software Engineer Intern",
      period: "May 2026 / Present",
      start: "2026.05",
      status: "Current role",
      href: "https://useworkshop.com/",
      logo: <span className="workshop-wordmark">Workshop</span>,
      summary:
        "At Workshop I work directly in the product and own features from the first idea through production. The pace has made me a stronger product engineer because I can see how each decision reaches real users.",
      highlights: [
        "Built and launched Cici’s Comms Planner, turning raw files and user input into long-range planned content.",
        "Gave Cici the ability to manage planned content and turn it directly into an email draft.",
        "Delivered production Rails, Vue, and JavaScript features on a platform sending nearly one million emails daily.",
      ],
      recognition: {
        label: "Inc. 5000 / 2026",
        primaryValue: "#1",
        headline: "Fastest-growing company in Nebraska",
        href: "https://useworkshop.com/press/workshop-named-the-no-1-fastest-growing-company-in-nebraska/",
        rankings: [
          { value: "#25", label: "U.S. software" },
          { value: "#272", label: "Overall" },
        ],
      },
      tools: ["Rails", "Vue", "JavaScript", "AI product work"],
    },
    {
      id: "cmg",
      number: "01",
      name: "Catholic Mutual Group",
      role: "Software Engineer Intern",
      period: "May 2025 / March 2026",
      start: "2025.05",
      status: "Completed",
      href: "https://www.catholicmutual.org/",
      logo: <img src="/cmg-logo.png" alt="" />,
      summary:
        "This was my first software engineering internship and where I learned how production work moves through a real organization. I worked on internal tools used in insurance operations, so reliability and security mattered from the start.",
      highlights: [
        "Built and maintained internal web applications that accelerated insurance claims and reduced manual work.",
        "Diagnosed defects and shipped secure features while working with engineering and business teams.",
      ],
      tools: ["Internal applications", "Secure delivery", "Claims workflows"],
    },
    {
      id: "union-pacific",
      number: "02",
      name: "Union Pacific",
      role: "Year-Round Tech Intern",
      period: "September 2025 / May 2026",
      start: "2025.09",
      status: "Completed",
      href: "https://www.up.com/",
      logo: <img src="/union-pacific-logo.png" alt="" />,
      summary:
        "Union Pacific moved me into enterprise software delivery. The scale was different because a single deployment decision could affect employees across the company.",
      highlights: [
        "Built company-wide deployment systems that delivered critical applications across Union Pacific.",
        "Packaged and released software updates through reliable, repeatable deployment workflows.",
        "Reviewed software portfolios and helped decide what needed an upgrade. Some applications needed a clear owner. Others were ready to be retired.",
      ],
      tools: [
        "Enterprise deployment",
        "Software packaging",
        "Application lifecycle",
      ],
    },
  ];

  return (
    <section className="experience section" id="experience">
      <SectionLabel number="03">Experience</SectionLabel>
      <div className="experience-heading">
        <p>A timeline of the work</p>
        <span>Omaha, Nebraska / 2025 to present</span>
      </div>
      <div className="career-shell">
        <div className="career-console-bar">
          <span>experience.log</span>
          <span>03 records / newest first</span>
        </div>
        <div className="career-timeline">
          <motion.i
            className="career-trace"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
          {[...experiences]
            .sort((a, b) => b.start.localeCompare(a.start))
            .map((experience, index) => (
              <motion.article
                className={`experience-record ${experience.status === "Current role" ? "is-current" : ""}`}
                key={experience.id}
                initial={{ opacity: 0, y: 55 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{
                  duration: 0.72,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="record-time">
                  <span>{experience.start}</span>
                  <b>{experience.period}</b>
                </div>
                <div className="record-junction" aria-hidden="true">
                  <i>
                    <span />
                  </i>
                </div>
                <div className="record-card">
                  <div className="record-top">
                    <div className={`record-logo ${experience.id}`}>
                      {experience.logo}
                    </div>
                    <div className="record-links">
                      <span>Node / {experience.number}</span>
                      <a
                        href={experience.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Company site <ArrowUpRight />
                      </a>
                    </div>
                  </div>
                  <div className="record-heading">
                    <span>{experience.name}</span>
                    <h3>{experience.role}</h3>
                  </div>
                  <p className="record-summary">{experience.summary}</p>
                  {experience.recognition && (
                    <a
                      className="record-recognition"
                      href={experience.recognition.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="recognition-copy">
                        <strong>
                          <b>{experience.recognition.primaryValue}</b>
                          <span>{experience.recognition.headline}</span>
                        </strong>
                      </span>
                      <small className="recognition-source">
                        {experience.recognition.label}
                      </small>
                      <span className="recognition-support">
                        <span className="recognition-rankings">
                          {experience.recognition.rankings.map((ranking) => (
                            <span key={ranking.label}>
                              <b>{ranking.value}</b>
                              <small>{ranking.label}</small>
                            </span>
                          ))}
                        </span>
                      </span>
                      <span className="recognition-arrow">
                        <ArrowUpRight />
                      </span>
                    </a>
                  )}
                  <div className="record-outputs">
                    {experience.highlights.map((highlight, highlightIndex) => (
                      <div key={highlight}>
                        <span>
                          {String(highlightIndex + 1).padStart(2, "0")}
                        </span>
                        <p>{highlight}</p>
                      </div>
                    ))}
                  </div>
                  <div className="record-footer">
                    <div>
                      {experience.tools.map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                    <b>
                      <i />
                      {experience.status}
                    </b>
                  </div>
                </div>
              </motion.article>
            ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [state, submit] = useForm("xrbkqejr");
  return (
    <footer className="contact section" id="contact">
      <SectionLabel number="04">Contact</SectionLabel>
      <div className="contact-layout">
        <motion.div
          className="contact-details"
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
        >
          <span className="contact-caption">Contact information</span>
          <h3>Get in touch</h3>
          <p>
            Email is the easiest way to reach me about engineering roles or
            questions about my work. You can also use the form and I will
            respond as soon as I can.
          </p>
          <div className="contact-list">
            <div>
              <span>Email</span>
              <a href="mailto:kodyhatcher@gmail.com">
                kodyhatcher@gmail.com <ArrowUpRight />
              </a>
            </div>
            <div>
              <span>Location</span>
              <p>Omaha, Nebraska</p>
            </div>
          </div>
          <div className="socials">
            <a
              href="https://github.com/KodyHatcher"
              target="_blank"
              rel="noreferrer"
            >
              <Github /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/kody-hatcher-a99768234"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin /> LinkedIn
            </a>
          </div>
        </motion.div>
        <motion.form
          className="contact-form"
          onSubmit={submit}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            className="form-heading"
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <span>Send a message</span>
            <small>All fields are required</small>
          </motion.div>
          {state.succeeded ? (
            <p className="sent" aria-live="polite">
              <Check /> Your message has been sent. I will get back to you soon.
            </p>
          ) : (
            <>
              <motion.label
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                Name
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                />
              </motion.label>
              <motion.label
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                Email address
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </motion.label>
              <motion.label
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                Message
                <textarea
                  name="message"
                  rows="4"
                  placeholder="What would you like to discuss?"
                  required
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </motion.label>
              <motion.button
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0 },
                }}
                disabled={state.submitting}
              >
                {state.submitting ? "Sending message" : "Send message"}
                <ArrowUpRight />
              </motion.button>
            </>
          )}
        </motion.form>
      </div>
      <div className="copyright">
        <span>Kody Hatcher</span>
        <span>Omaha, Nebraska</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <Header open={menuOpen} setOpen={setMenuOpen} />
      <main>
        <Intro />
        <Projects onSelect={setSelected} />
        <About />
        <Experience />
      </main>
      <Contact />
      <AnimatePresence>
        {selected && (
          <ProjectDialog project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
