import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, useTheme, useMediaQuery } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, metric, hideXAxisLabels }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width:960px)');
  const isTablet = useMediaQuery('(min-width:600px) and (max-width:959px)');

  const providers = data.map(d => d.provider);
  const values = data.map(d => d.value);

  // Identify the highest and lowest values
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  const chartData = {
    labels: providers,
    datasets: [
      {
        label: 'Value',
        data: values,
        backgroundColor: values.map(value => 
          value === maxValue ? '#FF0000' : // Highlight max value in red
          value === minValue ? '#0000FF' : // Highlight min value in blue
          '#FF5733' // Default orange color
        ),
        borderColor: '#FF5733',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: hideXAxisLabels ? 'transparent' : theme.palette.text.primary,
          maxRotation: 45,
          minRotation: 45,
        },
        title: {
          display: true,
          text: 'Providers',
          color: theme.palette.text.primary,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: theme.palette.text.primary,
        },
        title: {
          display: true,
          text: metric,
          color: theme.palette.text.primary,
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)', // Light grid lines
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: isDesktop ? '60vh' : isTablet ? '70vh' : '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: '64px',
        zIndex: 10,
      }}
    >
      <Box sx={{ width: '100%', height: '100%' }}>
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default BarChart;
