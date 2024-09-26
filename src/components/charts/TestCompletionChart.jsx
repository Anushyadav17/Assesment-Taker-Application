import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TestCompletionChart = ({ totalTests, doneTests }) => {
  const data = {
    labels: ['Completed Tests', 'Remaining Tests'],
    datasets: [
      {
        data: [doneTests, totalTests - doneTests],
        backgroundColor: ['#4CAF50', '#F7FAFC'],
        hoverBackgroundColor: ['#4CAF50', '#F7FAFC'],
        borderWidth: 0,
        cutout: '90%', // This makes it look like a ring
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-64 h-64 m-auto">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default TestCompletionChart;
