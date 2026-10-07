import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import '../css/education.css';

function Education(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    fetch(endpoints.education, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.education))
      .catch((err) => console.error(err));
  }, []);

  const selectedEducation = data?.[selectedIndex];

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div className="education-section">
            <Container>
              <div className="education-intro">
                <p>Select an entry to view its details.</p>
              </div>
              <div className="education-timeline">
                {data.map((education, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      className={`education-entry ${isSelected ? 'education-entry-selected' : ''}`}
                      key={education.cardTitle}
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      style={{
                        '--education-accent': theme.accentColor,
                        '--education-card': theme.cardBackground,
                        '--education-border': theme.cardBorderColor,
                        '--education-text': theme.color,
                      }}
                      aria-pressed={isSelected}
                    >
                      <span className="education-marker" aria-hidden="true">
                        {index + 1}
                      </span>
                      <span className="education-entry-content">
                        <span className="education-date">{education.title}</span>
                        <span className="education-entry-title">{education.cardTitle}</span>
                        <span className="education-entry-subtitle">{education.cardSubtitle}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              {selectedEducation && (
                <article
                  className="education-detail"
                  style={{
                    '--education-accent': theme.accentColor,
                    '--education-card': theme.cardBackground,
                    '--education-border': theme.cardBorderColor,
                    '--education-text': theme.color,
                  }}
                >
                  <div className="education-detail-image">
                    {selectedEducation.collegeImage && (
                      <a
                        href={selectedEducation.collegeWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${selectedEducation.cardSubtitle} website`}
                      >
                        <img
                          src={selectedEducation.collegeImage}
                          alt={`${selectedEducation.cardSubtitle} logo`}
                          className={`college-image ${selectedEducation.collegeImageClassName || ''}`}
                        />
                      </a>
                    )}
                  </div>
                  <div className="education-detail-copy">
                    <span className="education-detail-label">Education</span>
                    <h2>{selectedEducation.cardTitle}</h2>
                    <h3>{selectedEducation.cardSubtitle}</h3>
                    <p>{selectedEducation.cardDetailedText}</p>
                    <a
                      className="education-website-link"
                      href={selectedEducation.collegeWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit institution website
                    </a>
                  </div>
                </article>
              )}
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner />}
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
