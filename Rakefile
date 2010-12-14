class String
  def url_safe
    self.gsub(/\s+/, '-').downcase
  end
end
desc 'Generate categories page'
namespace :categories do
  require 'rubygems'
  require 'jekyll'
  include Jekyll::Filters

  options = Jekyll.configuration({})
  site = Jekyll::Site.new(options)
  site.read_posts('')

  desc 'create an index page with a list of categories'
  task  :make_index do
    puts "Generating category index page..."

    html = ""
    html << <<-HTML
---
layout: default
title: Categories!
section: blog
---
    HTML
    html << "<div id='categories'>"
    site.categories.sort.each do |category, posts|
      size = posts.length
      html << "<a href='/categories/#{category.url_safe}.html'>#{category}(#{size})</a>"
    end
    html << "</div>"
    File.open("categories.html", 'w+') do |file|
      file.puts html
    end
  end

  desc 'create individual category pages'
  task :make_pages do
    puts "Generating category pages..."

    site.categories.sort.each do |category, posts|
      html = ''
      html << <<-HTML
---
layout: default
title: Postings categoriezed under: "#{category}"
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

  task :generate => [:make_index, :make_pages]
end
