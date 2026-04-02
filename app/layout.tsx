
// Importaciones principales de Next.js y librerías externas
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google' // Fuentes de Google
import { Analytics } from '@vercel/analytics/next' // Analíticas de Vercel
import { Toaster } from 'react-hot-toast' // Toasts para notificaciones
import './globals.css' // Estilos globales


// Inicialización de las fuentes personalizadas
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });


// Metadatos globales de la aplicación (título, descripción, iconos, etc.)
export const metadata: Metadata = {
  title: 'Call-Inversion - Master Your Wealth',
  description: 'Simulador de inversión basado en Call-Inversion. Crea carteras equilibradas y aumenta tu patrimonio de forma inteligente.',
  generator: 'By Call-Inversion Team',
  icons: {
    icon: [
      // {
      //   url: '/favicon.png',
      //   media: '(prefers-color-scheme: light)',
      // },
      // {
      //   url: '/favicon.png',
      //   media: '(prefers-color-scheme: dark)',
      // },
      {
        url: '/favicon.png',
        type: 'image/png',
      },
    ],
    apple: '/favicon.png',
  },
}


// Componente raíz del layout de la aplicación
// Aquí se definen los wrappers globales y los providers
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_geist.className} font-sans antialiased`}>
        {/* Renderiza el contenido de la página */}
        {children}
        {/* Componente de analíticas de Vercel */}
        <Analytics />
        {/* Componente para mostrar notificaciones tipo toast */}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
