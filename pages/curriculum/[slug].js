import React from 'react';

const curriculum = props => {
  return <div></div>;
};

export async function getStaticPaths() {
  const res = await fetch(`${process.env.API_BASE}/wp-json/m2l-video/v1/curricula/paths`);
  const paths = await res.json();

  return {
    paths: paths.map(path => ({
      params: { slug: path.slug, term_id: path.term_id },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.API_BASE}/wp-json/m2l-video/v1/curriculum?slug=${context.params.slug}`);
  const curriculum = await res.json();

  return {
    props: { curriculum },
  };
}

export default curriculum;
