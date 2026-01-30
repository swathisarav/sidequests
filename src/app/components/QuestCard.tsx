import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

interface QuestCardProps {
  id: string;
  image: string;
  title: string;
  caption: string;
  tags: string[];
  content: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export function QuestCard({
  image,
  title,
  caption,
  tags,
  content,
  isExpanded,
  onToggle,
}: QuestCardProps) {
  return (
    <motion.div
      layout
      className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
        isExpanded ? 'col-span-full' : ''
      }`}
      onClick={onToggle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div layout className="relative">
        <img
          src={image}
          alt={title}
          className={`w-full object-cover ${
            isExpanded ? 'h-80' : 'h-48'
          } transition-all duration-300`}
        />
      </motion.div>

      <motion.div layout className="p-6">
        <motion.h2 layout className="text-2xl mb-2 text-gray-900">
          {title}
        </motion.h2>

        <motion.p layout className="text-gray-600 mb-4">
          {caption}
        </motion.p>

        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 mb-6 prose prose-sm max-w-none text-gray-700"
            >
              <ReactMarkdown>{content}</ReactMarkdown>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <motion.span
              key={index}
              layout
              className="px-3 py-1 bg-[#4CAF50] bg-opacity-10 text-[#4CAF50] rounded-full text-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
