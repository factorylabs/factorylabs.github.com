class String
  def url_safe
    self.gsub(/\s+/, '-').downcase
  end
end

namespace :categories do
  desc 'create individual category pages'
  task :create_pages do
    puts "Generating category pages..."
    require 'rubygems'
    require 'jekyll'
    include Jekyll::Filters

    options = Jekyll.configuration({})
    site = Jekyll::Site.new(options)
    site.read_posts('')

    site.categories.sort.each do |category, posts|
      html = ''
      html << <<-HTML
---
layout: default
title: "postings categorized under #{category}"
section: blog
---
      HTML
      html << '<div id="posts">'
      posts.reverse.each do |post|
        content = post.content
        post_data = post.to_liquid
        template = Liquid::Template.parse File.read('_includes/post.html')
        html << template.render( 
          "content" => Maruku.new(content).to_html,
          "post" => { 
            "date" => post_data["date"],
            "url" => post.url,
            "title" => post_data["title"],
            "author" => post_data["author"],
            "categories" => post.categories
          }
        )
      end
      html << '</div>'

      File.open("categories/#{category.url_safe}.html", 'w+') do |file|
        file.puts html
      end
    end
    puts 'Done.'
  end
end
