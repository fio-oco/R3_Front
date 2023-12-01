import { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';


export default function CommunityClimbs() {
  const [climbsShown, setClimbsShown] = useState([]);
  const [selectedClimb, setSelectedClimb] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchClimbs = async () => {
    try {
      const response = await fetch(`http://localhost:3007/climbs/select/${_id}`); // Replace with your endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch climbs');
      }
      const data = await response.json();
      setClimbsShown(data);
    } catch (error) {
      console.error('Error fetching climbs:', error);
    }
  };

  useEffect(() => {
    fetchClimbs();
  }, []);

/*   const handleImageClick = (climbShown) => {
    setSelectedClimb(climbShown);
    setIsModalOpen(true);
  }; */

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ maxwidth: 'cover', height: 'auto', overflowY: 'scroll' }}>
      <div className=''>
        <h2>Community Climbs Page</h2>
        <ImageList variant="masonry" cols={3} gap={8}>
          {climbsShown.map((climbShown, i) => (
            <ImageListItem key={i}>
              <h3>{climbShown.title} - {climbShown.location}</h3>
              <img
                onClick={() => handleImageClick(climbShown)}
                src={`${climbShown.imgUrl}?w=248&fit=crop&auto=format`}
                loading="lazy"
                alt={climbShown.title}
              />
            </ImageListItem>
          ))}
        </ImageList>
        <ClimbModal
          open={isModalOpen}
          onClose={handleCloseModal}
          climbShown={selectedClimb}
        />
      </div>
    </Box>
  );
}
