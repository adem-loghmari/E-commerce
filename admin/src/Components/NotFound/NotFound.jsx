import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const NotFound = () => (
  <Box sx={{ p: { xs: 2, sm: 3 } }}>
    <Card sx={{ maxWidth: 520, mx: 'auto', mt: { xs: 2, md: 6 } }}>
      <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
        <Typography sx={{ fontSize: '5rem', fontWeight: 800, lineHeight: 1, color: 'primary.main', mb: 2 }}>
          404
        </Typography>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 800, mb: 1 }}>
          Page not found
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3.5 }}>
          This admin page does not exist. Use the menu or go back to the dashboard.
        </Typography>
        <Button component={Link} to="/" variant="contained" sx={{ borderRadius: 2.5 }}>
          Back to Dashboard
        </Button>
      </CardContent>
    </Card>
  </Box>
);

export default NotFound;
