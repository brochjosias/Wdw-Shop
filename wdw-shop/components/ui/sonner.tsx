"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          // Cores para tema light
          "--normal-bg": "hsl(142, 71%, 90%)", // Verde claro
          "--normal-text": "hsl(142, 71%, 30%)", // Verde escuro
          "--normal-border": "hsl(142, 71%, 80%)",

          "--success-bg": "hsl(142, 71%, 45%)", // Verde vibrante
          "--success-text": "white",
          "--success-border": "hsl(142, 71%, 35%)",

          "--error-bg": "hsl(0, 84%, 60%)", // Vermelho
          "--error-text": "white",

          "--warning-bg": "hsl(38, 92%, 50%)", // Amarelo
          "--warning-text": "white",

          "--info-bg": "hsl(221, 83%, 53%)", // Azul
          "--info-text": "white",

          // Estilos adicionais
          "--toast-border-radius": "0.5rem",
          "--toast-box-shadow": "0 4px 12px rgba(0, 0, 0, 0.1)",
        } as React.CSSProperties
      }
      richColors // Habilita cores vibrantes
      closeButton // Mostra botão de fechar
      duration={4000}
      {...props}
    />
  );
};

export { Toaster };
