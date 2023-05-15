const mongoose=require("mongoose");
const Schema=mongoose.Schema;
//https://res.cloudinary.com/djfjsks1a/image/upload/w_300/v1683957299/YelpCamp/ulewiipfk4bfehknw3pg.jpg
const ImageSchema=new Schema({
    url:String,
    filename:String
});
ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_100');
    //TRYING TO MAKE WIDTH 100 PREDEFINE FOR ALL IMAGES
    //virtual allows not to be stored in model or database
});
const opts={toJSON:{virtuals:true}};
//virtual is like a function but using opts 
//we can add this as a property to the object one called using virutal with opt making it a property to the object
const CampgroundSchema=new Schema({
    title: String,
    images:[ImageSchema],
    geometry:{
        type:{ 
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    price: Number,
    description: String,
    location: String,
    author:{type:Schema.Types.ObjectId,ref:'User'},
    reviews:[{type:Schema.Types.ObjectId,ref:'Review'}]
},opts);
CampgroundSchema.virtual('properties.popUpMarkup').get(function(){
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0,20)}...</p>`;
});


CampgroundSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await Review.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })
    }
})
module.exports=mongoose.model('Campground',CampgroundSchema);