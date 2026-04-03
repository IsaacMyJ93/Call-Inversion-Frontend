export default function TerminosPage() {
  return (
    <main className="container max-w-3xl mx-auto py-12 px-6 text-foreground">
      <h1 className="text-3xl font-bold mb-6">Términos de Servicio</h1>
      <p className="text-sm text-muted-foreground mb-8">Última actualización: Abril de 2026</p>
      
      <div className="space-y-6 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Objeto del Servicio</h2>
          <p>Call-Inversion es una plataforma de simulación y educación financiera orientada al análisis y ponderación del riesgo. Los datos, algoritmos matemáticos y proyecciones mostradas tienen un propósito estrictamente académico. En ningún caso este servicio constituye asesoramiento financiero, legal o fiscal real.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Uso de la Plataforma</h2>
          <p>El usuario se compromete a hacer un uso adecuado y lícito de la plataforma. Queda estrictamente prohibido intentar vulnerar la seguridad del sistema, realizar peticiones masivas al servidor o utilizar los algoritmos de simulación para engañar a terceros.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Exención de Responsabilidad</h2>
          <p>Call-Inversion no se hace responsable de las decisiones de inversión reales que el usuario tome basándose en las métricas de esta plataforma. Las inversiones reales en los mercados financieros conllevan riesgo de pérdida del capital.</p>
        </section>
      </div>
    </main>
  );
}