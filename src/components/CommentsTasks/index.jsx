import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material"
import { BullPoint } from "../Bull"
import { MoreHoriz, ThumbUp, ThumbUpOffAlt } from "@mui/icons-material"
import * as Tag from './index.js'
import { Root } from "../Global/Root/root_styles.jsx"
import { db } from "../../firebaseConfig.js"
import { commentService } from "../../api/comments/addComments.js"
import { collection, onSnapshot } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { FormatRelativeTime } from "./formatRelativeTime.jsx"
import { AuthContext } from "../../authcontext/index.jsx"
import { LoCommAndDesc } from "../Loadinds/LoCommAndDesc/index.jsx"
export const CommentsTasks = ({
    shadow,
    isMobileQuery,
    taskId,
    colors,
    mt
}) => {
    const { user } = useContext(AuthContext)
    const [comments, setComments] = useState([])
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'comments'), async (snapshot) => {
            const commentsForTask = await commentService.comment.getCommentsForTask(taskId);
            setComments(commentsForTask);
        });
        return () => unsubscribe();
    }, [taskId]);
    const extractMentionsAndHashtags = (text) => {
        const mentionRegex = /@([\wÀ-ÖØ-öø-ÿ]+)/g;
        const hashtagRegex = /#([\wÀ-ÖØ-öø-ÿ]+)/g;
        const mentions = text.match(mentionRegex) || [];
        const hashtags = text.match(hashtagRegex) || [];
        return { mentions, hashtags };
    };
    const renderButtons = (text) => {
        const { mentions, hashtags } = extractMentionsAndHashtags(text);
        let updatedText = text;
        mentions.forEach((mention) => {
            updatedText = updatedText.replace(mention, `
                <strong style="
                    background-color: rgba(0,0, 255, 0.2); 
                    color: blue;
                    font-size: 13px;
                    padding: 2px;
                    border-radius: 8px;
                    margin-right: 4px,
                ">
                    ${mention}
                </strong>
            `);
        });
        hashtags.forEach((hashtag) => {
            updatedText = updatedText.replace(hashtag, `
            <strong style="
                background-color: rgba(25,31, 52, 0.2); 
                color: brown;
                font-size: 13px;
                padding: 2px;
                border-radius: 8px;
                margin-right: 4px,
            ">
                ${hashtag}
            </strong>
            `);
        });
        return <div dangerouslySetInnerHTML={{ __html: updatedText }} />;
    };
    const splitNameUserInScreens = (name) => {
        if (isMobileQuery) {
            return name.split(' ')[0];
        }
        return name;
    }
    if(comments.length === 0){
        return(
            <LoCommAndDesc/>
        )
    }
    return (
        <>
            {
                comments.map((comment, index) => {
                    return (
                        <Tag.CommentMainTag
                            key={index} isMobileQuery={isMobileQuery}
                            gap={1} mt={1}
                            mb={(comments.length - 1) === index && (shadow ? '10rem' : 5)}
                        >
                            <Tag.CommentMainParte1 mt={index === 0 ? (shadow ? '5rem' : 5) : 2}>
                                <Tag.CommentMainParteA diretion={'flex-start'}>
                                    <Avatar sx={{ height:35, width:35 }}
                                        src={comment.author.avatar} />
                                    <Stack sx={{
                                        color: Root.color_button,
                                        fontSize: '1.2rem',
                                        fontWeight: isMobileQuery ? 500 : 900
                                    }}>
                                        {splitNameUserInScreens(comment.author.name)}
                                    </Stack>
                                    <BullPoint />
                                    <Typography color={'text.secondary'}>
                                        <FormatRelativeTime dateTimeString={comment.timestamp} />
                                    </Typography>
                                </Tag.CommentMainParteA>
                                <div style={{
                                    border: Root.border,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 'auto',
                                    cursor: 'pointer',
                                    padding: '2px',
                                    color: Root.color_button
                                }}>
                                    <MoreHoriz  />
                                </div>
                            </Tag.CommentMainParte1>

                            <Tag.CommentMainParteA
                                sx={{
                                    borderLeft: Root.border,
                                    paddingInline: '0.8rem'
                                }}
                                diretion={'flex-start'} color={'text.secondary'}>
                                {renderButtons(comment.content) ? (
                                    <>
                                        {renderButtons(comment.content)}
                                    </>
                                ) : (
                                    <Typography color={'text.secondary'}>
                                        {comment.content}
                                    </Typography>
                                )}
                            </Tag.CommentMainParteA>
                            <Tag.CommentMainParteA sx={{ gap: 2, width: '100%', color: 'text.secondary' }} diretion={'flex-start'} >
                                <Tag.CommentMainParteA
                                    onClick={() => {
                                        commentService.comment.likeComment(
                                            comment.commentId, user.uid
                                        )
                                    }}
                                    diretion={'flex-start'} sx={{ width: 'auto' }}>
                                    {comment.actions.likes.includes(user.uid) ?
                                        <ThumbUp sx={{ color: colors ? colors : Root.color_button }} />
                                        : <ThumbUpOffAlt />}
                                    {comment.actions.likes.length}
                                </Tag.CommentMainParteA>
                                <Stack sx={{
                                    borderRight: Root.border,
                                    height: '1rem',
                                    width: '1px',
                                }} />
                                <Stack sx={{
                                    fontWeight: isMobileQuery ? 400 : 800
                                }}>
                                    Replay
                                </Stack>
                            </Tag.CommentMainParteA>
                        </Tag.CommentMainTag>
                    )
                })
            }
        </>
    )

}