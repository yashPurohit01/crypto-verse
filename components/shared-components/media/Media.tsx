"use client";

import React, { useEffect, useState } from 'react';
import { Group, Anchor, Text, Paper } from '@mantine/core';
import { IconBrandTwitter, IconBrandReddit, IconWorld, IconBrandGithub } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';


const Media= () => {
   const {coinDetails,loading} = useSelector((state:RootState) => state?.coins )


  const links = coinDetails?.links;
  return (
    <Paper p="md" shadow="sm">
      <Text size="xl" fw={100} mb="md">Social Media & Links</Text>
      <Group>
        {links?.homepage[0] && (
          <Anchor href={links.homepage[0]} target="_blank" style={{
            border:'1px solid #ffffff40',
            padding:'10px',
            borderRadius:'10px'
          }} >
            <Group >
              <IconWorld size={20} />
              <Text fw={100} fs={'xs'} style={{
                color:'white'
              }}>Official Website</Text>
            </Group>
          </Anchor>
        )}
        {links?.twitter_screen_name && (
          <Anchor href={`https://twitter.com/${links.twitter_screen_name}`} target="_blank" style={{
            border:'1px solid #ffffff40',
            padding:'10px',
            borderRadius:'10px'
          }}>
            <Group >
              <IconBrandTwitter size={20} />
              <Text fw={100} fs={'xs'} style={{
                color:'white'
              }}>Twitter</Text>
            </Group>
          </Anchor>
        )}
        {links?.subreddit_url && (
          <Anchor href={links.subreddit_url} target="_blank" style={{
            border:'1px solid #ffffff40',
            padding:'10px',
            borderRadius:'10px'
          }}>
            <Group >
              <IconBrandReddit size={20} />
              <Text fw={100} fs={'xs'} style={{
                color:'white'
              }}>Reddit</Text>
            </Group>
          </Anchor>
        )}
        {links?.repos_url.github[0] && (
          <Anchor href={links.repos_url.github[0]} target="_blank" style={{
            border:'1px solid #ffffff40',
            padding:'10px',
            borderRadius:'10px'
          }}>
            <Group >
              <IconBrandGithub size={20} />
              <Text fw={100} fs={'xs'} style={{
                color:'white'
              }}>GitHub</Text>
            </Group>
          </Anchor>
        )}
      </Group>
    </Paper>
  );
};

export default Media;
