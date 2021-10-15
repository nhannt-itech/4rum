import { Card, Avatar } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import CommentArea from './comment-area';
import { useState, useEffect } from 'react';
import './post-detail.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import { useParams } from 'react-router-dom';
import { getPost } from '../../../redux/post.slice';

export const PostDetailPage = () => {
	const dispatch = useDispatch();
	const { postId } = useParams();
	const post = useSelector((state) => state.post.post) || null;
	const [editor, setEditor] = useState();

	useEffect(() => {
		dispatch(getPost({ postId }));
	}, []);

	useEffect(() => {
		if (post) {
			console.log();
		}
	}, [post]);

	// const post = {
	// 	ImageUrl:
	// 		'https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/143887425_229254258845639_1889614086996814793_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=kZ-sg--OiGMAX-MbHwk&_nc_ht=scontent.fsgn2-3.fna&oh=5528460743f3ba96785635495f77f07a&oe=617F4F9A',
	// 	Title: 'Đây là một bài viết vui',
	// 	UpVote: 10,
	// 	DownVote: 100,
	// 	Summary:
	// 		'Khóa học lập trình C cho người mới bắt đầu. Khóa học này sẽ rất là tuyệt vời và thú vị, khiến bạn sẽ không buồn chán trong việc học lập trình',
	// 	CreateAt: '10 giờ trước',
	// 	CreateBy: 'Nguyễn Thanh Nhân',
	// 	TotalComment: 100,
	// };

	const [vote, setVote] = useState(0);

	const handleVote = (type) => {
		if (type === 'upVote') {
			vote === 1 ? setVote(0) : setVote(1);
		} else {
			vote === -1 ? setVote(0) : setVote(-1);
		}
	};

	return (
		<div className='post-detail-page'>
			<Card className='content-area'>
				<Card.Meta
					avatar={
						<div className='panel'>
							<Avatar
								className='avatar'
								src={
									'https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/143887425_229254258845639_1889614086996814793_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=kZ-sg--OiGMAX-MbHwk&_nc_ht=scontent.fsgn2-3.fna&oh=5528460743f3ba96785635495f77f07a&oe=617F4F9A'
								}
							/>
							<div hidden className='post-vote'>
								<CaretUpOutlined
									onClick={() => handleVote('upVote')}
									style={vote === 1 ? { color: '#648afc' } : null}
									className='vote-button'
								/>
								<br />
								<div className='vote-number'>100</div>
								<CaretDownOutlined
									onClick={() => handleVote('downVote')}
									style={vote === -1 ? { color: '#F64D4D' } : null}
									className='vote-button'
								/>
							</div>
						</div>
					}
					description={
						post && (
							<div style={{ textAlign: 'justify' }}>
								<h2>{post.title}</h2>
								<Editor
									editorState={EditorState.createWithContent(
										convertFromRaw(JSON.parse(post.content))
									)}
									readOnly={true}
									toolbarHidden={true}
									placeholder='Bạn đang nghĩ gì...'
								/>
							</div>
						)
					}
				/>
			</Card>
			<CommentArea />
		</div>
	);
};
