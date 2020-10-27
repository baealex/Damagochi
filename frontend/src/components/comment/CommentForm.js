import React from 'react';
import { toast } from 'react-toastify';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }
    }

    onChange(e) {
        this.setState({
            ...this.state,
            comment: e.target.value
        });
    }

    onSubmit() {
        if(this.state.comment == '') {
            toast('😅 댓글의 내용을 입력해주세요.');
            return;
        }
        this.props.onSubmit(this.state.comment);
        this.setState({
            ...this.state,
            comment: ''
        });
    }

    render() {
        return (
            <div className="comment-form mb-3">
                <textarea
                    rows="5"
                    className="form-control noto"
                    onChange={(e) => this.onChange(e)}
                    placeholder="배려와 매너가 밝은 커뮤니티를 만듭니다."
                    maxLength="300"
                    value={this.state.comment}>
                </textarea>
                <button
                    type="button"
                    onClick={() => this.onSubmit()}
                    className="btn btn-dark btn-block noto">
                    댓글 작성
                </button>
            </div>
        )
    }
}

export default CommentForm