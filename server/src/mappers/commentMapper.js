class CommentMapper {
    constructor() {
        this.convertComments = this.convertComments.bind(this);
    }
    convertComments(commentList) {
        const data = commentList.data.map((item) => ({
            id: item.id,
            message: item.message,
            image: item.publishDate,
            publishDate: item.publishDate,
            owner: item.owner
        }));
        const { page, limit, total } = commentList;
        return { data, page, limit, total };
    }
}

export default new CommentMapper();
