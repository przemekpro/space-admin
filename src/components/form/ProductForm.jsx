import './form.scss'
import { InputAdornment, TextField } from '@mui/material'
import { useForm } from 'react-hook-form';
import { ArrowBack, CameraAlt, DeleteOutline } from '@mui/icons-material';


import { useNavigate } from 'react-router-dom';

export default function ProductForm(props) {

    const {
        title,
        submitButton, 
        handleRegister, 
        popUp, 
        handleUpload, 
        selectedImg, 
        errorDuplicate, 
        deletePhoto, 
        img, 
        productNumber, 
        name, 
        price, 
        stock} = props

    const { register, handleSubmit, formState: {errors} } = useForm();
    
    const imgUrl = selectedImg ? URL.createObjectURL(selectedImg) : img

    const navigate = useNavigate()


    return (
        <div className="form">

            <div className='register__alert alert-error' style={{display: popUp ? 'block' : 'none'}}>
                <p className="register__alert-info">{errorDuplicate}</p>
            </div>

            
            <h2 className="form__title">{title}</h2>
            <form onSubmit={handleSubmit(data => handleRegister(data))} className="form__form">

                <div className="form__avatar-wrapper">
                    <label htmlFor='upload'>
                        <input 
                            id='upload' 
                            type='file' 
                            hidden 
                            accept="image/*"  
                            onChange={e => handleUpload(e)}
                        />

                        
                        {(selectedImg || img) ?

                        <div className="form__avatar-container">
                            <img src={imgUrl} alt="user avatar" className="form__avatar-img form__avatar-product" /> 
                        </div> :

                        <div className="form__placeholder-container">
                            <CameraAlt className='form__placeholder-icon' sx={{width: '200px', height: '200px'}} />
                            <p className='form__placeholder-text'>Upload your photo</p>
                        </div>}

                    </label>

                    {(selectedImg || img) && 
                    
                    <button type='button' onClick={() => deletePhoto()} className='form__avatar-remove'>
                        <DeleteOutline fontSize='small'/>
                        Delete
                    </button>}
                    
                </div>

                <div className="form__inputs-wrapper">

                    <TextField 
                        name="productNumber" 
                        maxLength='4'
                        className="form__input" 
                        label="Product No." 
                        variant="outlined" 
                        placeholder='xxxx' 
                        defaultValue={productNumber}
                        {...register("productNumber", {
                            required: 'Product number is required',
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Value must be a number',
                            },
                            minLength: {
                                value: 4,
                                message: "Product number must have 4 characters"
                            },
                            maxLength: {
                                value: 4,
                                message: "Product number must have 4 characters"
                            },

                        })} 
                        error={!!errors?.productNumber}                 
                        helperText={errors?.productNumber ? errors.productNumber.message : null}
                    />

                    <TextField 
                        name="name" 
                        type='text'
                        className="form__input" 
                        label="Product Name" 
                        variant="outlined" 
                        placeholder='iPhone' 
                        defaultValue={name}
                        {...register("name", {
                            required: 'Product name is required',
                        })} 
                        error={!!errors?.name}                 
                        helperText={errors?.name ? errors.name.message : null}
                    />

                    
                    <TextField 
                        name="price" 
                        className="form__input" 
                        label="Price" 
                        variant="outlined" 
                        placeholder='999' 
                        defaultValue={price}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        {...register("price", {
                            required: 'Price is required',
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Value must be a number',
                            },
                    })} 
                        error={!!errors?.price}                 
                        helperText={errors?.price ? errors.price.message : null}
                    />

                    
                    <TextField 
                        name="stock" 
                        className="form__input" 
                        label="Stock" 
                        variant="outlined" 
                        placeholder='12' 
                        defaultValue={stock}
                        {...register("stock", {
                            required: 'Stock is required',
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Value must be a number',
                            },
                    })} 
                        error={!!errors?.stock}                 
                        helperText={errors?.stock ? errors.stock.message : null}
                    />


                    <button className="form__button">{submitButton}</button>
                </div>
            </form>

            <button onClick={() => navigate('/products')} className='form__back-btn'>
                <ArrowBack fontSize='small'/>
                Products
            </button>
        </div>
    )
}