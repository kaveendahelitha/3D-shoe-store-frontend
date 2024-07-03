import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../actions/uploadActions";
import '../../styles/ImageUploader.css';

const ImageUploader = (props) => {
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [imageName, setImageName] = useState("");
    const { image } = useSelector(state => state.upload);

    const handleUploadClick = event => {
        let file = event.target.files[0];
        const imageData = new FormData();
        imageData.append('imageFile', file);
        setImageData(imageData);
        setImagePreview(URL.createObjectURL(file));
    };

    const uploadImageWithAdditionalData = () => {
        imageData.append('imageName', imageName);
        dispatch(uploadImage(imageData));
    };

    const handleChange = event => {
        setImageName(event.target.value);
    };

    return (
        <Container maxWidth="lg" className="root">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={
                                    imagePreview !== null ?
                                        imagePreview :
                                        "https://www.amerikickkansas.com/wp-content/uploads/2017/04/default-image.jpg"
                                }
                            />
                        </CardActionArea>
                    </Card>
                    <input
                        accept="image/*"
                        className="input"
                        id="upload-profile-image"
                        type="file"
                        onChange={handleUploadClick}
                    />
                    <label htmlFor="upload-profile-image">
                        <Button
                            variant="contained"
                            color="primary"
                            className="imageChangeButton"
                            component="span"
                        >
                            Change Image
                        </Button>
                    </label>
                    <TextField
                        fullWidth
                        label="Image Name"
                        margin="dense"
                        name="name"
                        className="imageName"
                        onChange={handleChange}
                        required
                        value={imageName}
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className="imageChangeButton"
                        onClick={() => uploadImageWithAdditionalData()}
                    >
                        Upload Image
                    </Button>
                    <Typography className="finalText">
                        {image === null ? "Select An Image To Upload" : "Image Uploaded. Saved as " + image}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ImageUploader;
