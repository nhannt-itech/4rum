import React, { Component } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

class PostEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
		};
	}

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState,
		});
	};

	render() {
		const { editorState } = this.state;
		return (
			<Editor
				editorState={editorState}
				wrapperClassName="demo-wrapper"
				editorClassName="demo-editor"
				onEditorStateChange={this.onEditorStateChange}
				placeholder="Bạn đang nghĩ gì..."
			/>
		);
	}
}

export default PostEditor;
