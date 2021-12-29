class PostMapper {
    constructor() {
        this.convertPost = this.convertPost.bind(this);
        this.convertUserPost = this.convertUserPost.bind(this);
        this.convertUsersPosts = this.convertUsersPosts.bind(this);
        this.convertPosts = this.convertPosts.bind(this);
    }
    convertPost(post) {
        return {
            id: post.id,
            text: post.text,
            image: post.image,
            publishDate: post.publishDate,
            owner: post.owner
        };
    }

    convertUserPost(post) {
        return {
            id: post.id,
            text: post.text,
            image: post.image,
            publishDate: post.publishDate,
        };
    }

    convertUsersPosts(postList) {
        const data = postList.data.map((item) => this.convertUserPost(item));
        const { page, limit, total } = postList;
        return { data, page, limit, total };
    }

    convertPosts(postList) {
        const data = postList.data.map((item) => this.convertPost(item));
        const { page, limit, total } = postList;
        return { data, page, limit, total };
    }
}

export default new PostMapper();
