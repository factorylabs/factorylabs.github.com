class String
  def url_safe
    self.gsub(/\s+/, '-').downcase
  end
end
desc 'Generate tags page'
namespace :tags do
  require 'rubygems'
  require 'jekyll'
  include Jekyll::Filters

  options = Jekyll.configuration({})
  site = Jekyll::Site.new(options)
  site.read_posts('')

  desc 'create an index page with a tag cloud'
  task  :make_index do
    puts "Generating tag index page..."

    html = ""
    html << <<-HTML
---
layout: default
title: tags!!!
section: blog
---
    HTML
    html << "<div id='tags'>"
    site.categories.sort.each do |category, posts|
      size = posts.length
      html << "<a href='/tags/#{category.url_safe}.html'>#{category}(#{size})</a>"
    end
    html << "</div>"
    File.open("tags.html", 'w+') do |file|
      file.puts html
    end
  end

  desc 'create individual tag pages'
  task :make_pages do
    puts "Generating tag pages..."

    site.categories.sort.each do |category, posts|
      html = ''
      html << <<-HTML
---
layout: default
title: Postings tagged "#{category}"
section: blog
---
      HTML
      html << '<div id="posts">'
      posts.reverse.each do |post|
        post_data = post.to_liquid
        template = Liquid::Template.parse File.read('_includes/post.html')
        html << template.render( 
          "content" => Maruku.new(post_data["content"]).to_html_document,
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

      File.open("tags/#{category.url_safe}.html", 'w+') do |file|
        file.puts html
      end
    end
    puts 'Done.'
  end

  task :generate => [:make_index, :make_pages]
end
