import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import PreviewIcon from "@mui/icons-material/Preview";
import Image1 from "../../assets/minimalist-portfolio.png";
import Image2 from "../../assets/tech-portfolio.png";

const portfolioTemplates = [
  {
    id: 1,
    title: "Modern Minimalist",
    description: "Clean and modern portfolio template with minimalist design",
    image: Image1,
    tags: ["React", "Material UI", "Responsive"],
    demoLink: "#",
    codeLink: "#",
  },
  {
    id: 2,
    title: "Creative Portfolio",
    description: "Professional portfolio template with dark mode support",
    image: Image2,
    tags: ["Dark Mode", "Animation", "Portfolio"],
    demoLink: "#",
    codeLink: "#",
  },
];

function Templates() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          mb: 6,
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Portfolio Templates
      </Typography>

      <Grid container spacing={4}>
        {portfolioTemplates.map((template) => (
          <Grid item key={template.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-8px)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={template.image}
                alt={template.title}
                sx={{
                  height: 250,
                  objectFit: "cover",
                  objectPosition: "top",
                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {template.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {template.description}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {template.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        background:
                          "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        color: "white",
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
              <CardActions sx={{ p: 2 }}>
                <Button
                  size="small"
                  startIcon={<PreviewIcon />}
                  href={template.demoLink}
                  target="_blank"
                  sx={{ mr: 1 }}
                >
                  Live Demo
                </Button>
                <Button
                  size="small"
                  startIcon={<CodeIcon />}
                  href={template.codeLink}
                  target="_blank"
                >
                  View Code
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Templates;
