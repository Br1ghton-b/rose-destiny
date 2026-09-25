import { motion } from 'framer-motion';

interface Props {
  eyebrow?: string;
  title: string;
  italic?: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  italic,
  description,
  align = 'center',
  light = false,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      {eyebrow && (
        <div className={`eyebrow mb-5 ${align === 'center' ? 'justify-center' : ''}`}>
          {eyebrow}
        </div>
      )}
      <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] ${light ? 'text-ivory' : 'text-ink'}`}>
        {title}{' '}
        {italic && <span className="italic text-rouge">{italic}</span>}
      </h2>
      {description && (
        <p className={`mt-5 text-base md:text-lg leading-relaxed ${light ? 'text-ivory/70' : 'text-ink/60'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
