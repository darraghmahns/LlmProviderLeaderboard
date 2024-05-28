import React, { useState, useEffect, useRef } from 'react';
import { Box, CssBaseline, ThemeProvider, useMediaQuery, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Header from './components/Header';
import Section from './components/Section';
import SectionHeader from './components/SectionHeader';
import BarChart from './components/BarChart';
import SideBar from './components/SideBar';
import RightPanel from './components/RightPanel';
import Footer from './components/Footer';
import darkColoredTheme from './theme';
import metricsData from './data';

function App() {
  const isDesktop = useMediaQuery('(min-width:960px)');
  const isMobile = useMediaQuery('(max-width:599px)');
  const [data, setData] = useState(metricsData[0].data);
  const [activeSection, setActiveSection] = useState(metricsData[0].id);
  const [sectionTitle, setSectionTitle] = useState(metricsData[0].title);
  const [metricDetails, setMetricDetails] = useState(metricsData[0]);
  const [opacity, setOpacity] = useState(1);
  const [selectedMetric, setSelectedMetric] = useState(metricsData[0].id);

  const sectionRefs = useRef([]);

  const handleMetricClick = (id) => {
    const sectionData = metricsData.find((section) => section.id === id);
    if (sectionData && id !== activeSection) {
      setOpacity(0);
      setTimeout(() => {
        setActiveSection(id);
        setSectionTitle(sectionData.title);
        setData(sectionData.data.length ? sectionData.data : [{ provider: 'No Data', value: 0 }]);
        setMetricDetails(sectionData);
        setOpacity(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  };

  const handleMetricChange = (event) => {
    const metricId = event.target.value;
    setSelectedMetric(metricId);
    const sectionData = metricsData.find((section) => section.id === metricId);
    if (sectionData) {
      setActiveSection(metricId);
      setSectionTitle(sectionData.title);
      setData(sectionData.data.length ? sectionData.data : [{ provider: 'No Data', value: 0 }]);
      setMetricDetails(sectionData);
    }
  };

  useEffect(() => {
    const currentRefs = sectionRefs.current;
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          const sectionData = metricsData.find((section) => section.id === sectionId);
          if (sectionData && sectionId !== activeSection) {
            setOpacity(0);
            setTimeout(() => {
              setActiveSection(sectionId);
              setSectionTitle(sectionData.title);
              setSelectedMetric(sectionId);
              setData(sectionData.data.length ? sectionData.data : [{ provider: 'No Data', value: 0 }]);
              setMetricDetails(sectionData);
              setOpacity(1);
            }, 500);
          }
        }
      });
    }, options);

    currentRefs.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      currentRefs.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [activeSection]);

  return (
    <ThemeProvider theme={darkColoredTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        <Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}>
          {isDesktop && <SideBar metrics={metricsData} onMetricClick={handleMetricClick} />}
          <Box
            sx={{
              flex: 1,
              marginLeft: isDesktop ? '200px' : '0',
              marginRight: isDesktop ? '300px' : '0',
              padding: '20px',
              overflowY: 'auto',
              position: 'relative',
            }}
          >
            <Box style={{ opacity, transition: 'opacity 0.5s ease-in-out', position: 'relative', top: 0, zIndex: 10 }}>
              <SectionHeader title={sectionTitle} />
            </Box>
            {isMobile && (
              <Box
                sx={{
                  position: 'fixed',
                  top: '140px',
                  width: '90%',
                  backgroundColor: 'white',
                  zIndex: 11,
                  padding: '10px',
                }}
              >
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Select Metric</InputLabel>
                  <Select value={selectedMetric} onChange={handleMetricChange} label="Select Metric">
                    {metricsData.map((metric) => (
                      <MenuItem key={metric.id} value={metric.id}>{metric.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
            <Box
              sx={{
                marginTop: isMobile ? '50px' : '0', // To account for the fixed dropdown on mobile
                height: 'calc(100vh - 64px)',
                width: isMobile ? '90%' : '70%' ,
                display: 'flex',
                position: 'fixed',
                left: isMobile ? '-20px' : '10%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                zIndex: 10,
              }}
            >
              <BarChart data={data} metric={metricDetails.metric} hideXAxisLabels={isMobile} />
            </Box>
            {metricsData.map((section, index) => (
              <Box
                id={section.id}
                ref={(el) => (sectionRefs.current[index] = el)}
                key={section.id}
                style={{ height: '100vh' }}
              >
                <Section />
              </Box>
            ))}
            
          </Box>
          {isDesktop && <RightPanel metricDetails={metricDetails} />}
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
