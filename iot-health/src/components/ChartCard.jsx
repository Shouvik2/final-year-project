import { motion } from 'framer-motion';

const ChartCard = ({ title, children }) => (
  <motion.div
    className="p-6 bg-white rounded-lg shadow-md"
    whileHover={{ scale: 1.02 }}
  >
    <h3 className="font-semibold mb-4">{title}</h3>
    <div style={{ width: '100%', height: 300 }}>
      {children}
    </div>
  </motion.div>
);

export default ChartCard;
