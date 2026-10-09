import { useRef, useEffect } from "react";
import { useScrollReveal, use3DTilt } from "@/hooks/useAnimations";
import { useParallax } from "@/hooks/useParallax";
import { Sparkles, Zap, Stars, Target } from "lucide-react";

export function AnimationsDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const observe = useScrollReveal("-60px");

  // Animação de parallax para o card principal
  const parallaxCardRef = useParallax<HTMLDivElement>(0.2, "up");

  // Animação de 3D tilt para o card interativo
  const tiltCardRef = use3DTilt(10);

  useEffect(() => {
    observe(demoRef.current);
    // Os cards internos (.fade-up) nunca eram observados e ficavam invisíveis.
    sectionRef.current
      ?.querySelectorAll(".fade-up")
      .forEach((el) => observe(el));
  }, [observe]);

  const animationTypes = [
    {
      name: "Parallax",
      description: "Movimento suave baseado no scroll",
      icon: <Sparkles size={24} />,
      color: "#454DFC",
    },
    {
      name: "Reveal",
      description: "Revelação diagonal ao entrar no viewport",
      icon: <Stars size={24} />,
      color: "#9070F7",
    },
    {
      name: "Fade Up",
      description: "Aparecimento com translação vertical",
      icon: <Zap size={24} />,
      color: "#85A9FA",
    },
    {
      name: "3D Tilt",
      description: "Inclinação 3D ao passar o mouse",
      icon: <Target size={24} />,
      color: "#6F41FA",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="animacoes"
      style={{
        padding: "var(--section-y) 0",
        background: "linear-gradient(180deg, transparent 0%, rgba(8,9,13,0.8) 50%, transparent 100%)",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
        }}
      >
        {/* Título com efeito de revelação */}
        <div ref={demoRef} className="rv" style={{ textAlign: "center" }}>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 800,
            background: "linear-gradient(135deg, #6F41FA, #454DFC 55%, #85A9FA)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 16,
          }}>
            Animações Inteligentes
          </h2>
          <p style={{
            color: "#A3A6B5",
            fontSize: 19,
            maxWidth: "56ch",
            margin: "0 auto",
          }}>
            Scroll, hover e interações que tornam a experiência única
          </p>
        </div>

        {/* Card principal com parallax */}
        <div
          ref={parallaxCardRef}
          style={{
            margin: "48px auto",
            maxWidth: 800,
            background: "rgba(16,17,24,0.9)",
            border: "1px solid #292B38",
            borderRadius: 32,
            padding: "clamp(32px, 5vw, 56px)",
            position: "relative",
            overflow: "hidden",
            backdropFilter: "blur(12px)",
            boxShadow: "0 20px 80px -20px rgba(8,9,13,0.8)",
          }}
        >
          {/* Gradiente de fundo */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: "linear-gradient(90deg, transparent, #454DFC, transparent)",
            }}
          />

          {/* Grid de tipos de animação */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 20,
              marginTop: 32,
            }}
          >
            {animationTypes.map((type, index) => (
              <div
                key={type.name}
                className="fade-up"
                style={{
                  "--delay": `${index * 100}ms`,
                  padding: 20,
                  background: "rgba(23,25,35,0.8)",
                  border: `1px solid ${type.color}33`,
                  borderRadius: 20,
                  textAlign: "center",
                  transition: "transform 280ms ease, border-color 280ms ease",
                } as React.CSSProperties}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: `${type.color}1A`,
                    border: `1px solid ${type.color}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                    color: type.color,
                  }}
                >
                  {type.icon}
                </div>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#F4F4F7",
                  marginBottom: 8,
                }}>
                  {type.name}
                </h3>
                <p style={{
                  color: "#A3A6B5",
                  fontSize: 14,
                  lineHeight: 1.4,
                }}>
                  {type.description}
                </p>
              </div>
            ))}
          </div>

          {/* Card com efeito de tilt 3D */}
          <div
            ref={tiltCardRef}
            style={{
              marginTop: 48,
              padding: 32,
              background: "linear-gradient(135deg, #1B1252, #151E6E 55%, #0D2257)",
              border: "1px solid rgba(69,77,252,0.3)",
              borderRadius: 24,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <h3 style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#85A9FA",
              marginBottom: 12,
            }}>
              <span className="hover-only">Passe o mouse para o efeito 3D</span>
              <span className="touch-only">Deslize o dedo para o efeito 3D</span>
            </h3>
            <p style={{
              color: "#A3A6B5",
              fontSize: 16,
              maxWidth: "48ch",
              margin: "0 auto",
            }}>
              Esta seção inclina suavemente seguindo o movimento do seu{" "}
              <span className="hover-only">cursor</span>
              <span className="touch-only">dedo</span>
            </p>
          </div>

          {/* Cards simples para demonstrar animações CSS */}
          <div style={{
            marginTop: 32,
            display: "grid",
            gap: 20,
          }}>
            <div
              className="fade-up"
              style={{
                "--delay": "400ms",
                padding: 32,
                background: "rgba(144,112,247,0.1)",
                border: "1px solid rgba(144,112,247,0.3)",
                borderRadius: 24,
                textAlign: "center",
              } as React.CSSProperties}
            >
              <h3 style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#9070F7",
                marginBottom: 12,
              }}>
                Animações CSS
              </h3>
              <p style={{
                color: "#A3A6B5",
                fontSize: 16,
              }}>
                Fade-up, scale-in e reveal diagonal via classes CSS
              </p>
            </div>

            <div
              className="fade-up"
              style={{
                "--delay": "600ms",
                padding: 32,
                background: "rgba(133,169,250,0.1)",
                border: "1px solid rgba(133,169,250,0.3)",
                borderRadius: 24,
                textAlign: "center",
                animation: "float-stats 3s ease-in-out infinite",
              } as React.CSSProperties}
            >
              <h3 style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#85A9FA",
                marginBottom: 12,
              }}>
                Animações de Float
              </h3>
              <p style={{
                color: "#A3A6B5",
                fontSize: 16,
              }}>
                Flutuação suave via animações CSS keyframes
              </p>
            </div>
          </div>
        </div>

        {/* Instrução para testar */}
        <div
          className="fade-up"
          style={{
            textAlign: "center",
            marginTop: 32,
            "--delay": "800ms",
          } as React.CSSProperties}
        >
          <p style={{
            color: "#6C6F82",
            fontSize: 14,
            fontStyle: "italic",
          }}>
            Role a página para ver todas as animações em ação
          </p>
        </div>
      </div>
    </section>
  );
}