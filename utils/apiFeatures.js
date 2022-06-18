class ApiFeatures {
    constructor(query,queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = {... this.queryString}
        
        const limitedFields = ['limit', 'page', 'sort', 'fields'];
        limitedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, matched => `$${matched}`)
        
        this.query =  this.query.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if(this.queryString.sort) {
            this.query = this.query.sort(this.queryString.sort);
        }
        return this
    }

    limit() {
        if(this.queryString.fields){
            this.query = this.query.select(this.queryString.fields)
        }else {
            this.query = this.query.select('-__v')
        }
        return this
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 5;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit)
        return this.query
    }

}

module.exports = ApiFeatures