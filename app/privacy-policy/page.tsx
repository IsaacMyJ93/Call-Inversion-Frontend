import Link from 'next/link';

export default function PrivacidadPage() {
  return (
    <main className="container max-w-3xl mx-auto py-12 px-6 text-foreground">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
      <p className="text-sm text-muted-foreground mb-8">Cumplimiento normativo adaptado al RGPD</p>
      
      <div className="space-y-6 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Recopilación de Datos</h2>
          <p>Para el funcionamiento de Call-Inversion, únicamente recopilamos la información estrictamente necesaria para la creación de la cuenta de usuario mediante nuestro proveedor seguro de autenticación (Supabase).</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Uso de la Información</h2>
          <p>Los datos recopilados se utilizan exclusivamente para gestionar su acceso a la plataforma y permitir la correcta ejecución de los algoritmos de diversificación de carteras asociados a su sesión. No vendemos ni cedemos sus datos personales a terceros.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Derechos del Usuario</h2>
          <p>De acuerdo con el Reglamento General de Protección de Datos (RGPD), usted tiene derecho a acceder, rectificar, limitar o eliminar sus datos personales en cualquier momento. Puede ejercer estos derechos eliminando su cuenta o contactando con el administrador del sistema en la sección de soporte <Link href="/support" className="underline hover:text-primary transition-colors">aquí</Link>.</p>
        </section>
      </div>
    </main>
  );
}